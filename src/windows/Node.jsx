import {useEffect} from "react"
import projects from "../data/projects.js"
import nodes from "../data/nodes.js"
import edges from "../data/edges.js"

const Node = ({handleOpen, id, path, hoveredItem, setHoveredItem}) => {

  const nodedata = nodes.find((n) => n.id === id)
  const projectdata = projects.find((p) => p.id === nodedata.projectid)

  // console.log(nodes.find((n) => n.id === id))

  const incomingedges = edges.filter((e) => e.target == id).sort((a,b) => {
    if ((a.source.split("_")[0] == a.target.split("_")[0]) && !(b.source.split("_")[0] == b.target.split("_")[0])) return -1
    if ((b.source.split("_")[0] == b.target.split("_")[0]) && !(a.source.split("_")[0] == a.target.split("_")[0])) return 1
    return 0
  })
  const outgoingedges = edges.filter((e) => e.source == id).sort((a,b) => {
    if ((a.source.split("_")[0] == a.target.split("_")[0]) && !(b.source.split("_")[0] == b.target.split("_")[0])) return -1
    if ((b.source.split("_")[0] == b.target.split("_")[0]) && !(a.source.split("_")[0] == a.target.split("_")[0])) return 1
    return 0
  })

  const phase_labels = {
      PH: 'Phenomenon',
      DI: 'Dimensions',
      UC: 'Use Cases',
      FU: 'Functionalities',
      VI: 'Visualisation',
      DE: 'Development',
      TE: 'Testing'
    }


  return (
      <>
      <div className="node-container">
        <div>
          <div className="node-linkednodes-header">incoming</div>
          {incomingedges.length < 1 ? 
            <div style={{opacity: 0.3, fontSize: "10px"}}>no nodes</div> : 
          incomingedges.map((e) => {
            console.log(e.source.split("_")[0] == e.target.split("_")[0])
            const nodeHighlighted = hoveredItem.kind == "node" && hoveredItem.id == e.source && hoveredItem.from !== `node-${id}`
            const nodeHovered = hoveredItem.kind == "node" && hoveredItem.id == e.source && hoveredItem.from == `node-${id}`
            const fillnode = nodeHighlighted ? "rgb(0,0,255)" : nodeHovered? "#000" : "#fff"
            const edgeHighlighted = hoveredItem.kind == "edge" && hoveredItem.id == `${e.source}-${e.target}` && hoveredItem.from !== `node-${id}`
            const strokeedge = edgeHighlighted ? "var(--blueblue)" : "#000"

            const srcProject = e.source.split("_")[0]
            const tgtProject = e.target.split("_")[0]
            return <div>
                <svg width="100%" height={25}>
                  <circle cx={12.5} cy={12.5} r={10} stroke="black" strokeWidth="2" fill={fillnode} 
                        onClick={() => handleOpen("node", e.source, path)} 
                        onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": e.source, "from": `node-${id}`})}} 
                        onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                          <title>{e.source.replace("_", " ")}</title>
                        </circle>
                  <line x1={22.5} x2="100%" y1={12.5} y2={12.5} stroke={strokeedge} strokeWidth="2" strokeDasharray={srcProject !== tgtProject ? "5,5" : null}/>
                  <line x1="calc(100% - 10px)" x2="100%" y1={5} y2={12.5} stroke={strokeedge} strokeWidth="2"/>
                  <line x1="calc(100% - 10px)" x2="100%" y1={20} y2={12.5} stroke={strokeedge} strokeWidth="2"/>
                  <rect x={22.5} y={7.5} width="100%" height={10} stroke="none" fill="transparent" 
                        onClick={() => handleOpen("edge", `${e.source}-${e.target}`, path)} 
                        onMouseEnter={(event) => {setHoveredItem({"kind": "edge", "id": `${e.source}-${e.target}`, "from": `node-${id}`})}} 
                        onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                          <title>{`${e.source.replace("_", " ")} – ${e.target.replace("_", " ")}`}</title>
                        </rect>
                </svg>
              </div>
          })}
        </div>

        <div className="node-information">
          <div onClick={() => handleOpen("project", projectdata.id, path)} className="clickable hover-line"
            onMouseEnter={(event) => {setHoveredItem({"kind": "project", "id": projectdata.id, "from": `node-${id}`})}} 
            onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}>
                <img src="./icons/icon_project.svg" height="10px"/> 
                <span> {projectdata.title}</span></div>
          <div onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": nodedata.id, "from": `node-${id}`})}} 
               onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}><h3>{phase_labels[nodedata.phase]}</h3></div>
          <div>{nodedata.long_desc.length > 0 ? <p>{nodedata.long_desc}</p> : <span className="smalltext">No phase description</span>}</div>
        </div>

        <div>
          <div className="node-linkednodes-header">outgoing</div>
          {outgoingedges.length < 1 ? 
            "no nodes" : 
          outgoingedges.map((e) => {
            const isHighlighted = hoveredItem.kind == "node" && hoveredItem.id == e.target && hoveredItem.from !== `node-${id}`
            const isHovered = hoveredItem.kind == "node" && hoveredItem.id == e.target && hoveredItem.from == `node-${id}`
            const fillnode = isHighlighted ? "rgb(0,0,255)" : isHovered? "#000" : "#fff"
            const edgeHighlighted = hoveredItem.kind == "edge" && hoveredItem.id == `${e.source}-${e.target}` && hoveredItem.from !== `node-${id}`
            const strokeedge = edgeHighlighted ? "var(--blueblue)" : "#000"

            const srcProject = e.source.split("_")[0]
            const tgtProject = e.target.split("_")[0]
            return <div key={e.target}>
                <svg className="node-svg" width="100%" height={25}>
                  <circle cx="calc(100% - 12.5px)" cy={12.5} r={10} stroke="black" strokeWidth="2" 
                        fill={fillnode} 
                        onClick={(event,d) => {handleOpen("node", e.target, path)}} 
                        onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": e.target, "from": `node-${id}`})}} 
                        onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                           <title>{e.target.replace("_", " ")}</title>
                        </circle>
                  <line x1={0} x2="calc(100% - 22.5px)" y1={12.5} y2={12.5} stroke={strokeedge} strokeWidth="2" strokeDasharray={srcProject !== tgtProject ? "5,5" : null}/>
                  <line x1="calc(100% - 32.5px)" x2="calc(100% - 22.5px)" y1={5} y2={12.5} stroke={strokeedge} strokeWidth="2"/>
                  <line x1="calc(100% - 32.5px)" x2="calc(100% - 22.5px)" y1={20} y2={12.5} stroke={strokeedge} strokeWidth="2"/>
                  <rect x={0} y={7.5} width="calc(100% - 22.5px)" height={10} stroke="none" fill="transparent" 
                        onClick={() => handleOpen("edge", `${e.source}-${e.target}`, path)} 
                        onMouseEnter={(event) => {setHoveredItem({"kind": "edge", "id": `${e.source}-${e.target}`, "from": `node-${id}`})}} 
                        onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                          <title>{`${e.source.replace("_", " ")} – ${e.target.replace("_", " ")}`}</title>
                        </rect>
                </svg>
              </div>
          })}
        </div>
      </div>
      </>
  )
}

export default Node