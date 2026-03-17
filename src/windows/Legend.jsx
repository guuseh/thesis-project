import {useEffect, useState} from 'react'

const Legend = ({id, path, open, zMap, openTooltip, maxMatrix}) => {

    const [top, setTop] = useState('All')
    const [showOther, setShowOther] = useState(false)

    useEffect(() => {
        if(Object.keys(zMap).length === 0){
            setTop('All')
            // return null
        } 
        if(open.length === 1 && open[0].id == 'legend'){
            setTop('All')
        } else{
            const noLegend = Object.entries(zMap).filter(([key, z]) => key !== "func_legend")

            if(noLegend.length === 0){
                setTop('All')
                // return null
            } else{
                const topKey = noLegend.reduce((max, [key, z]) => 
                z > noLegend.find(([k]) => k === max)?.[1] ? key : max
                , noLegend[0][0])

                if(topKey == "view_map"){
                    setTop('Map')
                } else if(topKey == "view_matrix"){
                    setTop('Matrix')
                } else if(topKey == "view_list"){
                    setTop('List')
                } else if(topKey.startsWith("project")){
                    setTop('Project')
                } else if(topKey.startsWith("edgelist")){
                    setTop('Edgelist')
                } else if(topKey.startsWith("node")){
                    setTop('Design Phase')
                } else if(topKey.startsWith("edge_")){
                    setTop('Path')
                } else if(topKey == "func_trails"){
                    setTop('Trails')
                } else if(topKey == "func_open"){
                    setTop('Open Frames')
                } else {
                    setTop('All')
                }
            }
        }

        

        
    }, [zMap, open])
   
    const priorityItems = {
        "Map": ['project-icon', 'node-icon', 'external-path-map', 'internal-path'],
        "Matrix": ['density'],
        "List": [],
        "Project": ['node-icon', 'internal-path', 'node-icon-small', 'external-path', 'timeline-bracket', 'density'],
        "Edgelist": ['node-icon', 'internal-path', 'external-path'],
        "Design Phase": ['node-icon', 'internal-path', 'external-path'],
        "Path": ['node-icon', 'internal-path', 'external-path'],
        "Trails": ['list-icon', 'map-icon', 'matrix-icon', 'project-icon', 'edgelist-icon', 'node-icon', 'edge-icon', 'history-path'],
        "Open Frames": ['open-window', 'list-icon', 'map-icon', 'matrix-icon', 'project-icon', 'edgelist-icon', 'node-icon', 'edge-icon'],
        "All": ['list-icon', 'map-icon', 'matrix-icon', 'project-icon', 'edgelist-icon', 'node-icon', 'edge-icon', 'internal-path', 'external-path', 'density', 'history-path', 'external-path-map', 'node-icon-small', 'timeline-bracket', 'open-window'],
    }

    const allItems = {
        'node-icon': {
            label: 'Design phase',
            description: 'A stage in the project development process',
            visual: <img src="./icons/icon_node.svg" width={20}/>
        },
        'internal-path': {
            label: 'Internal connection',
            description: 'Connection within the same project',
            visual: top == "Project" || top == "Map" ? <svg width={20} height={20}><line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="2"/></svg>
                        : <svg width={20} height={20}>
                            <line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="2"/>
                            <line x1={12} x2={20} y1={3} y2={10} stroke="black" strokeWidth="2"/>
                            <line x1={12} x2={20} y1={17} y2={10} stroke="black" strokeWidth="2"/>
                        </svg>
        }, 
        'external-path': {
            label: 'Cross-project connection',
            description: 'Connection between different projects',
            visual: top == "Map" ? <svg width={20} height={20}><line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="2" strokeDasharray="4 4"/></svg>
                    : top == "Project" ? <svg width={20} height={20}><line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="2" strokeDasharray="4 3" opacity="0.4"/></svg>
                        : <svg width={20} height={20}>
                            <line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="2" strokeDasharray="4 4"/>
                            <line x1={12} x2={20} y1={3} y2={10} stroke="black" strokeWidth="2"/>
                            <line x1={12} x2={20} y1={17} y2={10} stroke="black" strokeWidth="2"/>
                        </svg>
        },
        'project-icon': {
            label: 'Project',
            description: 'A research project or tool',
            visual: <img src="./icons/icon_project.svg" width={20}/>
        },
        'list-icon': {
            label: 'List-view',
            description: "Chronological overview of projects",
            visual: <img src="./icons/icon_list.svg" width={20}/>
        }, 
        'map-icon': {
            label: 'Map-view',
            description: 'Network graph of projects and connections between them',
            visual: <img src="./icons/icon_map.svg" width={20}/>
        },
        'matrix-icon': {
            label: 'Matrix-view',
            description: 'Matrices of connections between projects or design phases',
            visual: <img src="./icons/icon_matrix.svg" width={20}/>,
        }, 
        'edgelist-icon': {
            label: 'Edgelist',
            description: 'List of connecting paths',
            visual: <img src="./icons/icon_edgelist.svg" width={20}/>
        },
        'edge-icon': {
            label: 'Connecting path',
            description: 'A connection between one design phase and another',
            visual: <img src="./icons/icon_edge.svg" width={20}/>
        },
        'node-icon-small': {
            label: 'External design phase',
            description: 'A process stage in another project',
            visual: <svg width={20} height={20}>
                        <circle cx={10} cy={10} r={5} stroke="black" opacity="0.4" strokeWidth="2" fill="none"/>
                    </svg>
        },
        'external-path-map': {
            label: 'Cross-project connection',
            description: 'All connections between two projects. Width equals amount.',
            visual: <svg width={20} height={20}>
                        <line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="4" strokeDasharray="5 3"/>
                        <line x1={4} x2={12} y1={3} y2={10} stroke="black" strokeWidth="2"/>
                        <line x1={4} x2={12} y1={17} y2={10} stroke="black" strokeWidth="2"/>
                    </svg>
        },
        'timeline-bracket': {
            label: 'Phase duration',
            description: 'Shows how long a phase lasted',
            visual: <svg width={20} height={20}>
                        <line x1={0} x2={20} y1={10} y2={10} stroke="black" strokeWidth="2" strokeDasharray="2 2"/>
                        <rect x={14} y={7} width={6} height={6}/>
                    </svg>
        },
        'density': {
            label: 'Instance density',
            description: 'Darker cells indicate more instances of that connection',
            visual: <>
                <div style={{width: "50px", height: "20px", background: "linear-gradient(90deg,rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%)"}}></div>
                <div style={{width: "50px", display: "flex", justifyContent: "space-between", fontSize: 10}}>
                    <div>0</div>
                    <div>{top === "Matrix" || top === "Project" ? maxMatrix : 'max'}</div>
                </div></>
        },
        'history-path': {
            label: 'Travelled path',
            description: 'Path you took through the website',
            visual: <svg width={20} height={20}>
                        <path d="M.24,17c10,0,10-10,20-10" stroke="#9084ff" strokeWidth="2" fill="none"/>
                    </svg>
        }, 
        'open-window': {
            label: 'Open window',
            description: 'Window that is currently open somewhere',
            visual: <div className="open-overview-item" style={{width: "fit-content"}}>
                        <div style={{padding: "5px 10px"}}>
                            <img src="./icons/icon_project.svg" width={10}/>
                            <div style={{fontSize: 10, fontWeight: 600}}>TITLE</div>
                        </div>
                    </div>
        }
    }

    const getNavText = (type) => {
        const intros = {
            "Map": "Toggle between project overview and detailed design phase view. Scroll map to zoom, drag to reposition nodes or map. Click on a node or edge to open corresponding window. Hover over to highlight the item in other open windows.",
            "Matrix": "Toggle between project matrix and overall phase matrix. Click on a cell to open list of edges. Hover over project abbreviations to see full titles, hover over phase abbreviations to see explanation.",
            "List": "Explore projects chronologically. Hover over titles to highlight project in open frames.",
            "Project": "Explore design phases in the timeline. Toggle time duration on for details, or off for a concise overview. Click on nodes and edges to open corresponding windows. Hover over to highlight the item in other open windows. Show phase matrix and hover over cells to see corresponding paths in the timeline.",
            "Edgelist": "Click on a design phase, path, or project title to open corresponding windows. Hover over to highlight the item in other open windows.",
            "Design Phase": "Click on a design phase, path, or project title to open corresponding windows. Hover over to highlight the item in other open windows.",
            "Path": "Click on a design phase, path, or project title to open corresponding windows. Hover over to highlight the item in other open windows.",
            "Trails": "An overview of your explored paths. Click on an icon to reopen the window or bring to front. Hover over to highlight window across other open windows. To clear trails: Click on a path to clear subsequent entries, or choose Clear trails to clear all.",
            "Open Frames": "Click on an item to bring that window to the front. To close windows: Click on the red dot in the corner to close that window, or choose Close all. Resize windows to see their dimensions reflected :)",
            "All": "Click on elements to open their corresponding windows. Hover over to highlight that item across open windows. Click on a specific window to load its legend.",
        }
        return intros[type] || intros['All']
    }

    const currentPriority = priorityItems[top] || priorityItems['All']

    const priorityItemsToShow = currentPriority.filter(key => allItems[key]).map(key => ({key, ...allItems[key], isPriority: true}))
    const secondaryItemsToShow = Object.entries(allItems).filter(([key]) => !currentPriority.includes(key)).map(([key, item]) => ({key, ...item, isPriority: false}))
    const orderedItems = [...priorityItemsToShow, ...secondaryItemsToShow]

  return (
    <div style={{paddingBottom: 20}}>
            <div style={{padding: "20px 20px 10px 20px"}}>
                <h3>Navigation: {top}</h3>
                <div className="legend-item" style={{fontSize: 13}}>{getNavText(top)}</div>
                {priorityItemsToShow.length > 0 && 
                    <h3>Elements</h3>}
                {priorityItemsToShow.map(item => (
                    <div className="legend-item" style={{alignItems: item.key == "open-window" ? 'center' : 'start'}}>
                        <div>{item.visual}</div>
                        <div style={{display: 'flex', gap: 5, alignItems: 'center'}}>
                            <div>{item.label}</div>
                            <div className="info-button" style={{width: "14px", height: "14px", fontSize: "14px"}}
                                onMouseEnter={(e) => openTooltip(e, "legendinfo", item.description)}
                                onMouseLeave={(e) => openTooltip(e, 'close')}>i</div>
                            {/* <div style={{fontSize: 13}}>{item.description}</div> */}
                        </div>
                    </div>
                    ))}
            </div>
            {secondaryItemsToShow.length > 0 && showOther &&
            <>
            <div style={{width: "100%", borderTop: "1px solid var(--linegray)"}}></div>
            <div style={{padding: 20}}>
                 <h3 style={{opacity: 0.5}}>Other</h3>
                {secondaryItemsToShow.map(item => (
                    <div className="legend-item" style={{opacity: 0.5, marginBottom: "5px", alignItems: item.key == "open-window" ? 'center' : 'start'}}>
                        <div>{item.visual}</div>
                        <div style={{display: 'flex', gap: 5, alignItems: 'center', marginTop: '2px'}}>
                            <div style={{fontSize: 14}}>{item.label}</div>
                            <div className="info-button" style={{width: "14px", height: "14px", fontSize: "14px"}}
                                onMouseEnter={(e) => openTooltip(e, "legendinfo", item.description)}
                                onMouseLeave={(e) => openTooltip(e, 'close')}>i</div>
                        </div>
                    </div>
                    
                    ))}
            </div>
            </>}
            <div className="white-button" style={{margin: '0 auto', fontSize: 10, marginBottom: 20}} onClick={() => setShowOther(prev => !prev)}>{showOther ? 'Hide' : 'Show'} other elements of this website</div>
    </div>
  )
}

export default Legend