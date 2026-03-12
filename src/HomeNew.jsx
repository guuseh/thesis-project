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

        handleOpenFunc("func", "legend", [])

        // !! func here for checking if there's double parameters & open/minim overlap & weed out from url & setOpen

        history.replaceState(initialParams, "", document.location.href)

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
        if(open.some(e => e.id == id && e.kind == kind && !e.minim)){
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

        const newParams = paramsString.includes(`&${kind}=${id}`) ? paramsString.replace(`&${kind}=${id}`, "") : paramsString.includes(`${kind}=${id}`) ? paramsString.replace(`${kind}=${id}`, "") : paramsString.includes(`&minim=${kind}_${id}`) ? paramsString.replace(`&minim=${kind}_${id}`, "") : paramsString.includes(`minim=${kind}_${id}`) ? paramsString.replace(`minim=${kind}_${id}`, "") : paramsString
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

  return (
    <>
    {open.map((i) => {
        return i.kind == "view" && i.id == "map" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="view" id="map" path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key="view_map">
                    <MapView handleOpen={handleOpen} bringToFront={bringToFront} path={i.path} open={open} openTooltip={openTooltip} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem}/></WindowFrame>
            : i.kind == "view" && i.id == "matrix" && !i.minim ? 
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="view" id="matrix" path={i.path} position={[i.x, i.y]} size={[i.w, i.h]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key="view_matrix">
                    <Matrix handleOpen={handleOpen} path={i.path} openTooltip={openTooltip} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} setMaxMatrix={setMaxMatrix}/></WindowFrame>
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
            : i.kind == "func" && i.id == "history" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[window.innerWidth/10, window.innerHeight/4]} size={[window.innerWidth*0.39, window.innerHeight*0.5]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
                    <History history={navHistory} setNavHistory={setNavHistory} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} handleCloseAll={handleCloseAll} id={i.id} path={i.path} open={open} setOpen={setOpen} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} openTooltip={openTooltip} canUndo={canUndo} setCanUndo={setCanUndo}/></WindowFrame>
            : i.kind == "func" && i.id == "info" && !i.minim ?
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[window.innerWidth*(0.30/2), window.innerHeight/12]} size={[window.innerWidth*0.65, window.innerHeight*0.80]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
                    <Help id={i.id} path={i.path} open={open}/></WindowFrame>
            : i.kind == "func" && i.id == "legend" && !i.minim &&
                <WindowFrame zMap={zMap} bringToFront={bringToFront} handleOpen={handleOpen} handleClose={handleClose} handleMinim={handleMinim} saveFramePos={saveFramePos} kind="func" id={i.id} path={i.path} position={[-10, 30]} size={[300, window.innerHeight-80]} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} key={`func_${i.id}`}>
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
                        <div><img src={`/icons/${iconpath}.svg`} height="12px" /></div>
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
            <div id="legend-button" className="permanent-button button" onClick={() => handleOpenFunc("func", "legend", [])}>
                {(open.some(o => o.id === 'legend')&&zMap[`func_legend`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>} 
                Legend</div>
        </div>

        <div>
            <div className="button" onClick={() => {handleOpen('view','list', [])}}>List</div>
            <div className="button" onClick={() => {handleOpen('view','map', [])}}>Map</div>
            <div className="button" onClick={() => {handleOpen('view','matrix', [])}}>Matrix</div>
        </div>

        <div>
            <div className="permanent-button button" onClick={() => handleOpenFunc("func", "history", [])}>
                {(open.some(o => o.id === 'history')&&zMap[`func_history`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>}
                History</div>
            <div className="permanent-button button" id="overview-open-btn" onClick={() => handleOpenFunc("func", "open", [])}>
                {(open.some(o => o.id === 'open')&&zMap[`func_open`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>}
                Open frames</div>
            <div className="permanent-button button" onClick={() => handleOpenFunc("func", "info", [])}>
                {(open.some(o => o.id === 'info')&&zMap[`func_info`] == Math.max(...Object.values(zMap))) && <svg width="10px" height="10px"><line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white"/><line x1="0%" x2="100%" y1="100%" y2="0%" stroke="white"/></svg>}
                Info</div>
        </div>
    </div>

    <div id="home-background" style={{padding: open.some(o => o.id === 'legend') ? "3% 15% 0 350px" : "3% 15% 0 15%"}}>
        
                <h1>Welcome to the Design Research Network</h1>
                <div>
                    
                        <p>This interactive platform documents and explores the interconnected design research projects of <b>VCD & FinnGen</b>. It serves as both a tool for understanding our design process and a showcase of how our projects influence and build upon each other.</p>
                        <p>FinnGen is a research project in genomics and personalised medicine. It has collected and analysed genome and health data from 500,000 Finnish biobank donors to understand the genetic basis of diseases. In a collaboration with Aalto’s VCD department, we build data visualisations to help us understand the progression and biological mechanisms of diseases.</p>
                        <p>Each project progresses through distinct design phases, from initial concepts to final implementation. You can read more specifically about these phases under <b>info</b>. Beyond individual timelines, this platform reveals something less visible: the cross-pollination of ideas, methods, and insights that flow between projects. A visualisation technique developed in one project might inspire the interface of another; a challenge encountered in testing might lead to new research questions elsewhere.</p>
                    
                </div>

                <h3 style={{marginTop: 20}}>Explore the Network</h3>
                    <div>
                        <p>Choose your entry point based on how you prefer to navigate:</p>
                        <p><b>List View</b> – Browse all projects chronologically. Best for getting an overview of our work over time or finding a specific project by name and description.</p>
                        <p><b>Map View</b> – Visualize the network of projects and their connections. Toggle between an overview of projects and individual design phases to see both the big picture and the intricate relationships.</p>
                        <p><b>Matrix View</b> – Examine connection patterns. Switch between project-to-project and phase-to-phase views to understand which parts of our process most frequently inform each other.</p>
                        <p>From any view, click on projects, phases, or connections to dive deeper. Review the legend to get information on the navigation and symbols of a particular window. Your browsing journey creates a history you can review, allowing you to retrace your path through the research landscape. For more detailed information on how to use this platform, on the design process, and on VCD & FinnGen, please check <b>info</b>.</p>
                    </div>
                
                <div style={{display: "flex", gap: 10, flexDirection: 'row'}}>
                <div className="button" onClick={() => {handleOpen('view','list', [])}}>Open List</div>
                <div className="button" onClick={() => {handleOpen('view','map', [])}}>Open Map</div>
                <div className="button" onClick={() => {handleOpen('view','matrix', [])}}>Open Matrix</div>
                </div>
    </div>


    


    </>
  )
}

export default Home