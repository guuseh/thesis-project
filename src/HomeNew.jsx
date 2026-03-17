import {useState, useEffect, useRef} from "react"

import MapView from "./windows/Map.jsx"
import Matrix from "./windows/Matrix.jsx"
import List from "./windows/List.jsx"
import Project from "./windows/Project.jsx"
import EdgeList from "./windows/EdgeList.jsx"
import Node from "./windows/Node.jsx"
import Edge from "./windows/Edge.jsx"

import OpenOverview from "./windows/OpenOverview.jsx"
import History from "./windows/History.jsx"
import Help from "./windows/Help.jsx"
import Legend from "./windows/Legend.jsx"

import Tooltip from "./assets/Tooltip.jsx"
import WindowFrame from "./assets/WindowFrame.jsx"

import projects from "./data/projects.js"
import nodes from "./data/nodes.js"

const Home = () => {
    const isFirstRender = useRef(true)

    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)

    const [open, setOpen] = useState([])
    const [navHistory, setNavHistory] = useState([])
    const [zMap, setZMap] = useState({})
    const BASE_Z = 100
    const [tooltip, setTooltip] = useState({"show": false, "x": 0, "y": 0, "text": ""})

    const [hoveredItem, setHoveredItem] = useState({})

    const [maxMatrix, setMaxMatrix] = useState(1)

    const [canUndo, setCanUndo] = useState(false) // history
    const [canReopen, setCanReopen] = useState(false) // open frames

    const [showBg, setShowBg] = useState(true)

    const visualsRef = useRef();

    const keyOf = (kind, id) => `${kind}_${id}`

    useEffect(() => {
        const initialParams = []
        for (const p of params){
            if(initialParams.some(e => e.kind == p[0] && e.id == p[1])){
                // do nothing;
            } else if (p[0] == "minim"){
                const split = p[1].split("_")
                initialParams.push({"kind": split[0], "id": split[1], "minim": true, "path": [{"kind": split[0], "id": split[1], "path": []}]})
            } else{
                initialParams.push({"kind": p[0], "id": p[1], "path": [{"kind": p[0], "id": p[1], "path": []}]})
            }
        }

        setOpen(initialParams)
        let mergedNav = initialParams

        const savedNav = sessionStorage.getItem('navHistory');
        if(savedNav && savedNav.length > 0){
            const parsedNav = JSON.parse(savedNav)
            const missingParameters = initialParams.filter(p => {
                !parsedNav.some(i => i.kind == p.kind && i.id == p.id)
            })
            mergedNav = [...parsedNav, ...missingParameters]
            setNavHistory(mergedNav)
        } else{
            setNavHistory(initialParams)
        }
        
        setZMap(() => {
            const next = {}
            initialParams.forEach((o, i) => {
            next[`${o.kind}_${o.id}`] = BASE_Z + i
            })
            return next
        })

        // !! func here for checking if there's double parameters & open/minim overlap & weed out from url & setOpen

        history.replaceState(initialParams, "", document.location.href)

        updateVisualMargins()

        const handler = (event) => {
            if (event.state) setOpen(event.state)
        }
        window.addEventListener("popstate", handler)
        return () => window.removeEventListener("popstate", handler)

    }, [])

    

    // every time a new frame is opened /closed etc, remap the zIndex
    useEffect(() => {
        setZMap(prev => {
            let changed = false
            const next = { ...prev }

            // current max z
            const used = Object.values(prev)
            let maxZ = used.length ? Math.max(...used) : BASE_Z - 1

            open.forEach(o => {
                if (o.minim) return
                const key = `${o.kind}_${o.id}`
                if (!(key in next)) {
                    next[key] = ++maxZ
                    changed = true
                }
            })
            return changed ? next : prev
        })
        }, [open])

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false;
            return;
        }
        sessionStorage.setItem('navHistory', JSON.stringify(navHistory))
    }, [navHistory])

    // when clicking on a frame, bring its z-index to the top
    const bringToFront = (kind, id) => {
        const key = keyOf(kind, id)
        setZMap(prev => {
            const entries = Object.entries(prev)
            .filter(([k]) => k !== key)
            .sort((a, b) => a[1] - b[1])

            const next = {}
            entries.forEach(([k], i) => {
            next[k] = BASE_Z + i
            })

            next[key] = BASE_Z + entries.length

            return next
        })
    }


    const handleOpen = (kind, id, parentPath) => {
        // if it's already open, don't open
        if(open.some(e => decodeURIComponent(e.id) === decodeURIComponent(id) && e.kind === kind && !e.minim)){
            // !!! ---> check if history contains the path, otherwise add to history !!!!
            bringToFront(kind, id)
            return;
        }
        setCanReopen(false)
        // check if it's minimised, maximise instead of open
        if(open.some( e => e.id == id && e.kind == kind && e.minim)){
            handleMaxim(kind, id)
            return;
        }

        const newPath = [
            ...parentPath,
            {"kind": kind, "id": id, "path": parentPath}
        ]

        setNavHistory((prev) => [
            ...prev, {"kind": kind, "id": id, "path": newPath}
        ])

        const newState = [...open, {"kind": kind, "id": id, "path": newPath}]
        setOpen((prev) => ([...prev, {"kind": kind, "id": id, "path": newPath}]))
        bringToFront(kind, id)
        setCanUndo(false)


        const newParams = paramsString.length > 0 ? `${paramsString}&${kind}=${id}` : `?${paramsString}&${kind}=${id}`
        history.pushState(newState, "", newParams)
    }

    const handleClose = (kind, id) => {
        const newState = open.filter(e => e.id !== id || e.kind !== kind)
        setOpen((prev) => (prev.filter(e => e.id !== id || e.kind !== kind)))
        
        setZMap(prev => {
            const next = { ...prev }
            delete next[`${kind}_${id}`]
            return next
        })

        const encodedId = id.replace(">", "%3E")

        const newParams = paramsString.includes(`&${kind}=${encodedId}`) ? paramsString.replace(`&${kind}=${encodedId}`, "") : paramsString.includes(`${kind}=${encodedId}`) ? paramsString.replace(`${kind}=${encodedId}`, "") : paramsString.includes(`&minim=${kind}_${encodedId}`) ? paramsString.replace(`&minim=${kind}_${encodedId}`, "") : paramsString.includes(`minim=${kind}_${encodedId}`) ? paramsString.replace(`minim=${kind}_${encodedId}`, "") : paramsString
        history.pushState(newState, "", newParams)
    }

    const handleCloseAll = (array) => {
        const newState = open.filter(e => e.kind == "func") // only keep functional frames open
        setOpen((prev) => prev.filter(e => e.kind == "func"))

        history.pushState(newState, "", location.protocol + "//" + location.host + location.pathname)
    }

    const handleMinim = (kind, id, x, y, w, h) => {
        const newState = open.map(o => (o.kind == kind && o.id == id ? {...o, minim: true, "x": x, "y": y, "w": w, "h": h} : o))
        setOpen((prev) => prev.map(o => (o.kind == kind && o.id == id ? {...o, minim: true, "x": x, "y": y, "w": w, "h": h} : o)))
        const newParams = paramsString.includes(`&${kind}=${id}`) ? paramsString.replace(`&${kind}=${id}`, "") : paramsString.includes(`${kind}=${id}`) ? paramsString.replace(`${kind}=${id}`, "") : paramsString
        history.pushState(newState, "", newParams + "&minim=" + kind + "_" + id)
    }

    const handleMaxim = (kind, id) => {
        const newState = open.map(o => (o.kind == kind && o.id == id ? {...o, minim: false} : o))
        setOpen((prev) => prev.map(o => (o.kind == kind && o.id == id ? {...o, minim: false} : o)))
        bringToFront(kind, id)

        const newParams = paramsString.includes(`&minim=${kind}_${id}`) ? paramsString.replace(`&minim=${kind}_${id}`, "") : paramsString.includes(`minim=${kind}_${id}`) ? paramsString.replace(`minim=${kind}_${id}`, "") : paramsString
        history.pushState(newState, "", newParams + "&" + kind + "=" + id)
    }

    const handleOpenFunc = (kind, id, parentPath) => {
        if(zMap[`${kind}_${id}`] == Math.max(...Object.values(zMap))){
            handleClose(kind, id)
            return;
        }
        if(open.some(e => e.id == id && e.kind == kind && !e.minim)){
            bringToFront(kind, id)
            return;
        }
        // check if it's minimised, maximise instead of open
        if(open.some( e => e.id == id && e.kind == kind && e.minim)){
            handleMaxim(kind, id)
            return;
        }

        const newPath = [
            ...parentPath,
            {"kind": kind, "id": id, "path": parentPath}
        ]

        setOpen((prev) => ([...prev, {"kind": kind, "id": id, "path": newPath}]))
        bringToFront(kind, id)

    }

   const saveFramePos = (kind, id, x, y, w, h) => {
        setOpen((prev) => prev.map(o => (o.kind == kind && o.id == id ? {...o, "x": x, "y": y, "w": w, "h": h} : o)))
        // new history state necessary??
   }

   const findProjectName = (nodeid) => {
    const projectid = nodeid.split("_")[0]
    const project = projects.find((p) => p.id === projectid)
    return project.title
   }

   const findNodeFromEdge = (nodeid) => {
    const node = nodes.find((n) => n.id === nodeid)
    return node
   }

    const openTooltip = (e, kind, custom, size) => {
        if(kind == 'close'){
            setTooltip({"show": false, "x": 0, "y": 0, "text": "", "size": "s"})
            return;
        }
        let text = ""
        switch (kind){
            case 'mapinfo': text = "This network graph shows the projects in relation to one another. The overview shows projects as a whole, with the width of the links between them indicating the amount of connections from one project to another. The detailed overview shows the projects' individual phases as nodes, with connections between them, allowing you to directly see which phase leads to which next phase both within one project and between projects."
                break;
            case 'matrixinfo': text = "These matrices show the density of connections between two points. The Projects view shows all the connections between the different projects. The Phases view shows an overview of the connections between different phases within and across all projects. Click on a cell to view those edges."
                break;
            case 'projectinfo': text = `This is an overview of the design process of this project. It is divided in 7 kinds of phases that tackle 7 different problems. The nodes show the order of the phases over time, with the connections between them showing which next phase it led to. The smaller nodes going to the top of the graph are connections to different projects. Clicking on a node or an edge shows you more information about this particular point in the process. By default it shows an overview view for compact scanning, and you can toggle a timeline view that shows you how long each phase took.`
                break;
            case 'projectmatrixinfo': text = 'The matrix shows an overview of connections between phases within this project. Hover over the cells to highlight the matching edges in the timeline. Click on a cell to open a list of those connections.'
                break;
            case 'legendinfo': text = custom
                break;
            case 'PH': text = "Phenomenon: The focus of the research tool."
                break;
            case 'DI': text = 'Dimensions: The necessary data.'
                break;
            case 'UC': text = 'Use Cases: The different possible people and needs the tool should provide for.'
                break;
            case 'FU': text = 'Functionalities: The concrete tasks the tool can execute.'
                break;
            case 'VI': text = 'Visualisation: Encoding of the data in a visualisation.'
                break;
            case 'DE': text = 'Development: Programming the tool.'
                break;
            case 'TE': text = "Testing: Moments to test the tool and gather feedback."
                break;
            case 'title': text = custom
        }
        setTooltip({"show": true, "x": e.clientX, "y": e.clientY, "text": text, "size": size})
    }

    function updateVisualMargins(){
        const width = window.innerWidth;

        const b = Math.log(7) / Math.log(2);
        const a = 10 / Math.pow(1000, b);

        const margin = a * Math.pow(width, b)
        const clamped = Math.max(5, Math.min(margin, 150))

        document.documentElement.style.setProperty('--dynamic-margin', `${clamped}px`)
    }

    useEffect(() => {
     if(!visualsRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            if(entries[0]){
                updateVisualMargins()
            }
        })
        resizeObserver.observe(visualsRef.current)

        return() => resizeObserver.disconnect()
  }, [])

    // console.log(open)

  return (
    <>
    {open.map((i) => {
        return i.kind == "view" && i.id == "map" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="view" id="map" path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key="view_map">
                    <MapView handleOpen={handleOpen} bringToFront={bringToFront} path={i.path} open={open} openTooltip={openTooltip} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem}/></WindowFrame>
            : i.kind == "view" && i.id == "matrix" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="view" id="matrix" path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key="view_matrix">
                    <Matrix handleOpen={handleOpen} path={i.path} openTooltip={openTooltip} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} setMaxMatrix={setMaxMatrix} open={open}/></WindowFrame>
            : i.kind == "view" && i.id == "list" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="view" id="list" path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key="view_list">
                    <List handleOpen={handleOpen} path={i.path} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem}/></WindowFrame>
            : i.kind == "project" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="project" id={i.id} path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`project_${i.id}`}>
                    <Project handleOpen={handleOpen} id={i.id} path={i.path} open={open} openTooltip={openTooltip} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} setMaxMatrix={setMaxMatrix}/></WindowFrame>
            : i.kind == "edgelist" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="edgelist" id={i.id} path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`edgelist_${i.id}`}>
                    <EdgeList handleOpen={handleOpen} id={i.id} path={i.path} findProjectName={findProjectName} findNodeFromEdge={findNodeFromEdge} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem}/></WindowFrame>
            : i.kind == "node" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="node" id={i.id} path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`node_${i.id}`}>
                    <Node handleOpen={handleOpen} id={i.id} path={i.path} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem}/></WindowFrame>
            : i.kind == "edge" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="edge" id={i.id} path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`edge_${i.id}`}>
                    <Edge handleOpen={handleOpen} id={i.id} path={i.path} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem}/></WindowFrame>
            : i.kind == "func" && i.id == "open" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[window.innerWidth/10*5, window.innerHeight/4]} size={[window.innerWidth*0.39, window.innerHeight*0.5]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
                    <OpenOverview open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} handleCloseAll={handleCloseAll} id={i.id} path={i.path} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} canReopen={canReopen} setCanReopen={setCanReopen}/></WindowFrame>
            : i.kind == "func" && i.id == "trails" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[window.innerWidth/10, window.innerHeight/4]} size={[window.innerWidth*0.39, window.innerHeight*0.5]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
                    <History history={navHistory} setNavHistory={setNavHistory} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} handleCloseAll={handleCloseAll} id={i.id} path={i.path} open={open} setOpen={setOpen} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} openTooltip={openTooltip} canUndo={canUndo} setCanUndo={setCanUndo}/></WindowFrame>
            : i.kind == "func" && i.id == "info" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[window.innerWidth*(0.30/2), window.innerHeight/12]} size={[window.innerWidth*0.65, window.innerHeight*0.80]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
                    <Help id={i.id} path={i.path} open={open}/></WindowFrame>
            : i.kind == "func" && i.id == "legend" && !i.minim &&
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[10, 60]} size={[300, window.innerHeight-80]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
                    <Legend id={i.id} path={i.path} open={open} zMap={zMap} openTooltip={openTooltip} maxMatrix={maxMatrix}/></WindowFrame>
    })}

    {tooltip.show && <Tooltip x={tooltip.x} y={tooltip.y} setTooltip={setTooltip} size={tooltip.size}>{tooltip.text}</Tooltip>}

     <div id="minim-bar">
        {open.filter((o) => {
            return o.minim
        }).map((m, i) => {
            const iconpath = m.kind === "view" ? `icon_${m.id}` 
                                : `icon_${m.kind}`
            const text = m.kind === "view" ? m.id 
                            : m.kind === "project" ? m.id
                            : m.kind === "edgelist" ? m.id.split(":").slice(1).join(':').replace(':', ": ").replaceAll('>', " – ")
                            : m.kind === 'node' ? m.id.replace("_", " ")
                            : m.kind === 'edge' ? m.id.replaceAll("_", " ").replace("-", " – ")
                            : m.kind
            return <div className="minim-item" style={{zIndex: open.filter((o) => o.minim).length - i}}>
                        <div><img src={`./icons/${iconpath}.svg`} height="12px" /></div>
                        <div onClick={() => handleMaxim(m.kind, m.id)}>{text}</div>
                        <div className="minim-item-close" onClick={() => handleClose(m.kind, m.id)}>
                            <svg width="100%" height="100%" >
                            <line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                            <line x1="100%" x2="0%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                            </svg>
                        </div>
                    </div>
        })}
    </div>

    <div id="permanent-buttons">
        <div>
            <div id="legend-button" className="permanent-button" onClick={() => handleOpenFunc("func", "legend", [])}>
                {(open.some(o => o.id === 'legend')&&zMap[`func_legend`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>} 
                Legend</div>
        </div>

        <div>
            <div className="white-button" onClick={() => {handleOpen('view','list', [])}}>List</div>
            <div className="white-button" onClick={() => {handleOpen('view','map', [])}}>Map</div>
            <div className="white-button" onClick={() => {handleOpen('view','matrix', [])}}>Matrix</div>
        </div>

        <div>
            <div className="permanent-button" onClick={() => handleOpenFunc("func", "trails", [])}>
                {(open.some(o => o.id === 'trails')&&zMap[`func_trails`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>}
                Your trails</div>
            <div className="permanent-button" id="overview-open-btn" onClick={() => handleOpenFunc("func", "open", [])}>
                {(open.some(o => o.id === 'open')&&zMap[`func_open`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>}
                Open windows</div>
            <div className="permanent-button" onClick={() => handleOpenFunc("func", "info", [])}>
                {(open.some(o => o.id === 'info')&&zMap[`func_info`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>}
                Info</div>
        </div>
    </div>

    <div id="home-background" ref={visualsRef}>
        
                <div id="home-bg-top">
                    <div id="home-instructions-left">
                        {showBg && <>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M40,0 Q20,100 100,100" fill="none" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="40%" x2="30%" y1="0%" y2="10%" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="40%" x2="50%" y1="0%" y2="10%" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="home-instructions-container">
                            <p>Find out how to navigate each window & what any symbols mean in the legend.</p>
                        </div>
                        </>}
                    </div>
                    <div id="home-titlecard">
                        <h1>The Interactive Design Process Visualisation</h1>
                        <p>This interactive platform documents and explores the interconnected design research projects of VCD & FinnGen. It serves as both a tool for understanding our design process and a showcase of how our projects influence and build upon each other.</p>
                    </div>
                    <div id="home-instructions-right">
                        {showBg && <>
                        <div className="home-instructions-container"><p>Check out the progression of your exploration in your trails.</p></div>
                        <div className="home-instructions-container"><p>For an overview of all the windows you have open, click here.</p></div>
                        <div className="home-instructions-container"><p>To get more information about, well, everything, check info.</p></div>
                        <svg width="100%" height="100%" preserveAspectRatio="none">
                            <path d="M60,180 C-70,90 150,100 130,0" fill="none" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="130" x2="120" y1="0" y2="12" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="130" x2="140" y1="0" y2="12" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <svg width="100%" height="100%" preserveAspectRatio="none">
                            <path d="M30,0 Q140,50 60,90" fill="none" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="30" x2="45" y1="0" y2="1" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="30" x2="40" y1="0" y2="13" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <svg width="100%" height="100%" preserveAspectRatio="none">
                            <path d="M30,0 Q80,100 0,200" fill="none" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="30" x2="45" y1="0" y2="12" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                            <line x1="30" x2="27" y1="0" y2="18" stroke="var(--bglineblue)" strokeWidth="2px" vectorEffect="non-scaling-stroke" />
                        </svg>
                        </>}
                    </div>
                </div>

                {showBg && <div id="home-visuals">
                    <div id="home-visuals-left">
                        <div id="home-visuals-one">
                            <div>1</div>
                            <h4>Choose the entry point of your exploration based on how you prefer to navigate.</h4>
                        </div>
                        <div id="home-visuals-list" className="home-visuals-container">
                            <img src="./visuals/list.svg" />
                            <div>
                                <div className="white-button" onClick={() => {handleOpen('view','list', [])}}>Open List</div>
                                <div className="smalltext">Browse all projects chronologically. Best for getting an overview of our work or finding a specific project by name or description.</div>
                            </div>
                        </div>
                        <div id="home-visuals-map" className="home-visuals-container">
                            <img src="./visuals/map.svg" />
                            <div>
                                <div className="white-button" onClick={() => {handleOpen('view','map', [])}}>Open Map</div>
                                <div className="smalltext">Visualise the network of projects and their connections. Toggle between an overview of projects and individual design phases to see both the big picture and the detailed relationships.</div>
                            </div>
                        </div>
                        <div id="home-visuals-matrix" className="home-visuals-container">
                            <img src="./visuals/matrix.svg" />
                            <div>
                                <div className="white-button" onClick={() => {handleOpen('view','matrix', [])}}>Open Matrix</div>
                                <div className="smalltext">Examine connection patterns. Switch between project-to-project and phase-to-phase views to understand which parts of our process most frequently inform each other.</div>
                            </div>
                        </div>
                        <div id="home-visuals-two">
                            <div>2</div>
                            <h4>And explore the design process of each project on their pages:</h4>
                        </div>
                    </div>
                    <div id="home-visuals-right">
                        <img src="./visuals/project.svg" />
                        
                    </div>
                </div>}
                
                {/* <div style={{display: "flex", gap: 10, flexDirection: 'row'}}>
                <div className="button" onClick={() => {handleOpen('view','list', [])}}>Open List</div>
                <div className="button" onClick={() => {handleOpen('view','map', [])}}>Open Map</div>
                <div className="button" onClick={() => {handleOpen('view','matrix', [])}}>Open Matrix</div>
                </div> */}
    </div>
    

    <div className="white-button" id="toggle-bg" style={{fontSize: '12px'}} onClick={() => setShowBg(prev => !prev)}>{showBg ? 'Hide' : 'Show'} instructional background</div>

    <div id="grid"></div>
    


    </>
  )
}

export default Home