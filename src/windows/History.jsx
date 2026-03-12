import {useRef, useEffect, useState, useCallback} from 'react'
import * as d3 from 'd3'

const History = ({history, setNavHistory, handleOpen, handleClose, handleMinim, handleCloseAll, id, path, open, setOpen, hoveredItem, setHoveredItem, openTooltip, canUndo, setCanUndo}) => {

     const getUniqueMaximalPaths = (history) => {
        if (history.length === 0) return [];
        
        // Helper to check if pathA is a prefix of pathB
        const isPrefix = (pathA, pathB) => {
            if (pathA.length >= pathB.length) return false;
            return pathA.every((step, i) => 
                step.kind === pathB[i].kind && step.id === pathB[i].id
            );
        };
        
        // Filter out paths that are prefixes of other paths
        return history.filter((entryA) => {
            return !history.some((entryB) => 
                entryA !== entryB && isPrefix(entryA.path, entryB.path)
            );
        });
    };


    const svgRef = useRef();
    const containerRef = useRef();
    const [size, setSize] = useState({ width: 800, height: 600 })
    const [historyUndoStack, setHistoryUndoStack] = useState([])
    

    const buildTreeData = (history) => {
        // const tree = [];
        const root = {
            kind: "root",
            id: 'root',
            children: []
        }

        history.forEach((e) => {
            // let currentLevel = tree;
            let currentLevel = root.children

            e.path.forEach((p, i) => {
                let existingNode = currentLevel.find((n) => n.kind == p.kind && n.id == p.id)
                if(!existingNode){
                    existingNode = {
                        "kind": p.kind,
                        "id": p.id,
                        "path": p.path,
                        "children": [],
                    }
                    currentLevel.push(existingNode)
                }
                currentLevel = existingNode.children
            })
        })
        // return tree;
        return root;
    }

    useEffect(() => {
        if(!containerRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            if(entries[0]){
                const { width, height } = entries[0].contentRect;
                setSize({width, height})
            }
        })
        resizeObserver.observe(containerRef.current)

        return() => resizeObserver.disconnect()
    }, [])

    const saveHistorySnapshot = useCallback(() => {
        setHistoryUndoStack(prev => [...prev, {
            history: [...history],
            openFrames: [...open]
        }])
    }, [history, open])

    const undoClearHistory = useCallback(() => {
        if(historyUndoStack.length === 0) return;

        const lastSnapshot = historyUndoStack[historyUndoStack.length - 1]


        setNavHistory(lastSnapshot.history);
        setOpen(lastSnapshot.openFrames);
        setHistoryUndoStack(prev => prev.slice(0, -1))
        setCanUndo(false)
        // setTimeout(() => {
        //     isUndoingRef.current = false
        // }, 100)
    }, [historyUndoStack])

    const clearHistory = () => {
        saveHistorySnapshot()
        setNavHistory([])
        handleCloseAll()
        sessionStorage.removeItem("navHistory")
        setCanUndo(true)
    }

    const handleLinkDelete = useCallback((nodeData) => {
        saveHistorySnapshot(); 

        const pathToDelete = [...nodeData.path, {kind: nodeData.kind, id: nodeData.id}];
        const parentPath = nodeData.path;
        const newHistory = history.filter(entry => {
            // if(entry.path.length < pathToDelete.length){
            // console.log(entry)
            if(entry.path.length <= parentPath.length){
                // console.log("path is shorter or equal")
                return true;
            } 
            const extendsFromParent = parentPath.every((step, i) => {
                // console.log("extends: ", step)
                const what = entry.path[i]?.kind === step.kind && entry.path[i]?.id === step.id
                // console.log(what)
                return what
            })

            if(extendsFromParent && entry.path[parentPath.length]?.kind === nodeData.kind && entry.path[parentPath.length]?.id === nodeData.id){
                handleClose(entry.kind, entry.id)
                return false;
            }
            return true;
        })
        // console.log(newHistory)
        setNavHistory(newHistory)
        setCanUndo(true)
    }, [history, setNavHistory])


    useEffect(() => {
        if(!svgRef.current) return;

        d3.select(svgRef.current).selectAll("*").remove();

        if(!history || history.length == 0) return;

        const treeData = buildTreeData(history);

        const width = size.width;
        const height = size.height;
        const margin = { top: 20, right: 100, bottom: 20, left: 60 }

        const svg = d3.select(svgRef.current)
                    .attr("width", "100%")
                    .attr("height", "100%")
                    // .attr("viewBox", `0 0 ${width} ${height}`)
                    .attr("preserveAspectRatio", "xMidYMid meet");

        // Map kinds to symbol IDs
        const kindToIcon = {
            "default": "./icons/icon_default.svg#icon",
            "map": "./icons/icon_map.svg#icon",
            "matrix": "./icons/icon_matrix.svg#icon",
            "list": "./icons/icon_list.svg#icon",
            "project": "./icons/icon_project.svg#icon",
            "edgelist": "./icons/icon_edgelist.svg#icon",
            "node": "./icons/icon_node.svg#icon",
            "edge": "./icons/icon_edge.svg#icon",
        };

        const g = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

        const treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right])

        const root = d3.hierarchy(treeData, d => d.children)

        treeLayout(root)

        const edge = g.selectAll(".history-link")
            .data(root.links())
            .join("path")
            .attr("class", "history-link")
            .attr("fill", "none")
            .attr("stroke", "#9084ff")
            .attr("stroke-width", 2)
            .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x))
            .style("cursor", "pointer")
            .on('click', (event, linkData) => {
                event.stopPropagation();
                handleLinkDelete(linkData.target.data)
            })
            .on('mouseenter', function(e,d){
                openTooltip(e, "title", "delete path", "s")
                d3.select(this).attr("stroke", "red")
            })
            .on('mouseleave', function(e,d){
                openTooltip(e, "close")
                d3.select(this).attr("stroke", "#9084ff")
            })

        const node = g.selectAll(".history-node")
                        .data(root.descendants())
                        .join("g")
                        .attr('class', "history-node")
                        .attr("transform", d => `translate(${d.y}, ${d.x})`)
                        .style("cursor", "pointer")
                    
            // node.append("circle")
            //     .attr("r", 5)
            //     .attr("fill", d => d.data.kind == "view" ? "#1b00cd" : d.data.kind == "project" ? "#5136ff" : d.data.kind == "edgelist" ? "#907ffc" : d.data.kind == "node" ? "#bab0fa" : d.data.kind == "edge" ? "#d5cefe" : "#100078")
            //     .attr("stroke", "#fff")
            //     .attr("stroke-width", 2)

            node.append("circle")
                .attr("x", -12)
                .attr("y", -12)
                .attr('r', (d) => d.data.kind == "view" || d.data.kind == "root" ? 13 : d.data.kind == "project" || d.data.kind == "edgelist" ? 11 : 6)
                .attr("fill", d => d.data.kind == "root" ? "#ffffff00" : "var(--lightblue_trans)")

            node.append("use")
                .attr("class", "history-icon")
                .attr("href", d => d.data.kind == "view" ? kindToIcon[d.data.id] : kindToIcon[d.data.kind] || kindToIcon["default"])
                .attr("x", -12)
                .attr("y", -12)
                // .attr("width", (d) => d.data.kind == "view" || d.data.kind == "root" ? 24 : d.data.kind == "project" || d.data.kind == "edgelist" ? 20 : 14)
                // .attr("height", (d) => d.data.kind == "view" || d.data.kind == "root" ? 24 : d.data.kind == "project" || d.data.kind == "edgelist" ? 20 : 14)
                .style("scale", (d) => d.data.kind == "view" || d.data.kind == "root" ? 1.1 : d.data.kind == "project" || d.data.kind == "edgelist" ? 0.9 : 0.6)
                .attr("fill", "#000")
            
            node.append("text")
                .attr("dy", d => d.children ? 24 : 4)
                .attr("x", d => d.children ? 0 : 13)
                .style("text-anchor", d => d.children ? "middle" : "start")
                .style("font-size", "12px")
                .text(d => d.data.kind == "root" ? "" : d.data.kind == "project" ? `${d.data.id}` : "")

            node.append("title")
                .text(d => `${d.data.kind}: ${d.data.id}`)

            node.on('click', function(event, data){
                handleOpen(data.data.kind, data.data.id, data.data.path)
            }).on("mouseenter", (e,d) => {
                    let text;
                    if(d.data.kind === "node"){
                        text = d.data.id.replace("_", " ")
                    } else if(d.data.kind === "edge"){
                        text = d.data.id.replace("-", " – ").replaceAll("_", " ")
                    } else if(d.data.kind === "edgelist"){
                        text = d.data.id.split(":").splice(1).join(":").replace(":", ": ").replace(">", " > ")
                    } else if(d.data.kind === "project") {
                        text = ""
                    }else{
                        text = d.data.id
                    }
                    setHoveredItem({"kind": d.data.kind, "id": d.data.id, "from": "history"})
                    openTooltip(e, "title", text, "s")})
            .on("mouseleave", (e,d) => {
                    setHoveredItem({"kind": null, "id": null, "from": null})
                    openTooltip(e, "close")})
    }, [history, size, handleLinkDelete, open])

    useEffect(() => {
        if(!svgRef.current) return;

        const svg = d3.select(svgRef.current)

        svg.selectAll(".history-icon")
            .attr('fill', (d) => {
                return hoveredItem.kind == d.data.kind && hoveredItem.id == d.data.id && hoveredItem.from !== "history" ? "var(--blueblue)" : "#000"
            })

    }, [hoveredItem])

    // console.log(isUndoingRef.current)
    // console.log(historyUndoStack)

  return (
    <div ref={containerRef} style={{width: "100%", height: "99%"}}>
        {!history || history.length == 0 ?
            <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -150%)", opacity: 0.3}}>No history to show</div>
        :   
        <div id="history-buttons">
            <div className="button" style={{background: "var(--darkblue)", color: "white"}} onClick={() => {clearHistory(history)}}>Clear history</div>
            <div className="smalltext">or click on a path to clear subsequent entries</div>
        </div>
        }
        {canUndo && <div className="button" style={{position: "absolute", right: 20, background: "red"}} onClick={() => undoClearHistory()}>Undo</div>}
        
        <svg ref={svgRef}></svg>
    </div>
  )
}

export default History