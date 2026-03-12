import React from 'react'
import edges from "../data/edges.js"
import nodes from "../data/nodes.js"

const Edge = ({handleOpen, id, path, hoveredItem, setHoveredItem}) => {

  const splitid = id.split("-")
  const sourceid = splitid[0]
  const targetid = splitid[1]

  const edgedata = edges.find((e) => e.source == sourceid && e.target == targetid)
  const sourcenode = nodes.find((n) => n.id == sourceid)
  const targetnode = nodes.find((n) => n.id == targetid)

  const phase_labels = {
      PH: 'Phenomenon',
      DI: 'Dimensions',
      UC: 'Use Cases',
      FU: 'Functionalities',
      VI: 'Visualisation',
      DE: 'Development',
      TE: 'Testing'
    }

  const sourceHighlight = hoveredItem.kind == "node" && hoveredItem.id == sourceid && hoveredItem.from !== `edge-${id}`
  const sourceHover = hoveredItem.kind == "node" && hoveredItem.id == sourceid && hoveredItem.from == `edge-${id}`
  const sourceFill = sourceHighlight ? "var(--blueblue)" : sourceHover ? "#000" : "#fff"

  const edgeHighlight = hoveredItem.kind == "edge" && hoveredItem.id == id && hoveredItem.from !== `edge-${id}` && hoveredItem.from !== "window"
  const edgeStroke = edgeHighlight ? "var(--blueblue)" : "#000"

  const targetHighlight = hoveredItem.kind == "node" && hoveredItem.id == targetid && hoveredItem.from !== `edge-${id}`
  const targetHover = hoveredItem.kind == "node" && hoveredItem.id == targetid && hoveredItem.from == `edge-${id}`
  const targetFill = targetHighlight ? "var(--blueblue)" : targetHover ? "#000" : "#fff"

  return (
    <div className="edge-container">
      <div style={{padding: "0 10px 0 0"}}>
        <div onClick={() => handleOpen("project", sourcenode.projectid, path)} 
              onMouseEnter={(event) => {setHoveredItem({"kind": "project", "id": sourcenode.projectid, "from": `edge-${id}`})}} 
              onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} 
              className="clickable hover-line">
                <img src="/icons/icon_project.svg" height="10px"/> 
                <span> {sourcenode.projectid}</span></div>
        <div onClick={() => handleOpen("node", sourcenode.id, path)} 
              onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": sourcenode.id, "from": `edge-${id}`})}} 
              onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
              className="clickable hover-line"><h3>{phase_labels[sourcenode.phase]}</h3></div>
        <div>{sourcenode.short_desc.length > 0 ? <p>{sourcenode.short_desc}</p> : <span className="smalltext">No phase description</span>}</div>
      </div>

      <div>
        <svg width="30px" height="30px">
          <circle cx="50%" cy="50%" r="calc(50% - 1px)" stroke="black" stroke-width={2} fill={sourceFill}
              onClick={() => handleOpen("node", sourcenode.id, path)} 
              onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": sourceid, "from": `edge-${id}`})}} 
              onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                <title>{sourceid.replace("_", " ")}</title>
              </circle>
        </svg>
      </div>

      <div>
        <div><svg width="100%" height="30px">
          <line x1="0" x2="100%" y1="50%" y2="50%" stroke={edgeStroke} stroke-width={2} strokeDasharray={sourcenode.projectid !== targetnode.projectid ? "5,5" : null}/>  
          <line x1="calc(100% - 15px)" x2="100%" y1="20%" y2="50%" stroke="black" strokeWidth={2}/>
          <line x1="calc(100% - 15px)" x2="100%" y1="80%" y2="50%" stroke="black" strokeWidth={2}/>
          <rect x="0" y="35%" width="100%" height="30%" fill="transparent" 
                onMouseEnter={(event) => {setHoveredItem({"kind": "edge", "id": `${id}`, "from": `edge-${id}`})}} 
                onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}>
                  <title>{id.replace("-", " – ").replaceAll("_", " ")}</title>
                </rect>
        </svg></div> 
        <div>{edgedata?.long_desc.length > 0 ? <p>{edgedata.long_desc}</p> : <span className="smalltext">No connection description</span>}</div>
      </div>

      <div>
        <svg width="30px" height="30px">
          <circle cx="50%" cy="50%" r="calc(50% - 1px)" stroke="black" stroke-width={2} fill={targetFill}
              onClick={() => handleOpen("node", targetid, path)} 
              onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": targetid, "from": `edge-${id}`})}} 
              onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                <title>{targetid.replace("_", " ")}</title>
              </circle>
        </svg>
      </div>

      <div style={{padding: "0 0 0 10px"}}>
        <div onClick={() => handleOpen("project", targetnode.projectid, path)} 
              onMouseEnter={(event) => {setHoveredItem({"kind": "project", "id": targetnode.projectid, "from": `edge-${id}`})}} 
              onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
              className="clickable hover-line">
                <img src="/icons/icon_project.svg" height="10px"/> 
                <span> {targetnode.projectid}</span></div>
        <div onClick={() => handleOpen("node", targetnode.id, path)} 
              onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": targetnode.id, "from": `edge-${id}`})}} 
              onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
              className="clickable hover-line"><h3>{phase_labels[targetnode.phase]}</h3></div>
        <div>{targetnode.short_desc.length > 0 ? <p>{targetnode.short_desc}</p> : <span className="smalltext">No phase description</span>}</div>
      </div>
    </div>
  )
}

export default Edge