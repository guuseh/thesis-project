import {useState, useEffect, useMemo} from 'react'
import projects from "../data/projects.js"
import nodes from "../data/nodes.js"
import edges from "../data/edges.js"

// EDGE LIST ID FORMAT
// project-to-project = proj:LOD>WIFG
// phase-to-phase = phase:PH>FU
// within project phase-to-phase = proj-phase:LOD:PH>FU
// all cross proj from one proj = proj:LOD>*
// individual edges = edges:LOD_A1-LOD_B0,LOD_B0-LOD_C0

const EdgeList = ({handleOpen, id, path, findProjectName, findNodeFromEdge, hoveredItem, setHoveredItem}) => {

  const memoNodes = useMemo(() => nodes.filter(n => n.id), [])
  const memoEdges = useMemo(() => edges.filter(e => e.source && e.target), [])

  const phase_labels = {
      PH: 'Phenomenon',
      DI: 'Dimensions',
      UC: 'Use Cases',
      FU: 'Functionalities',
      VI: 'Visualisation',
      DE: 'Development',
      TE: 'Testing'
    }

  const parseId = (id) => {
    const [type, ...rest] = id.split(':')
    const params = rest.join(":")

    if(type == "proj"){
      const [srcProj, tgtProj] = params.split(">")
      return {
        type: "project-to-project",
        sourceProject: srcProj,
        targetProject: tgtProj === "*" ? null : tgtProj
      }
    }

    if(type == "phase"){
      const [srcPhase, tgtPhase] = params.split(">")
      return {
        type: "phase-to-phase",
        sourcePhase: srcPhase,
        targetPhase: tgtPhase
      }
    }

    if(type == 'internalphase'){
      const [srcPhase, tgtPhase] = params.split(">")
      return {
        type: "internal-phase-to-phase",
        sourcePhase: srcPhase,
        targetPhase: tgtPhase
      }
    }

    if(type == 'externalphase'){
      const [srcPhase, tgtPhase] = params.split(">")
      return {
        type: "external-phase-to-phase",
        sourcePhase: srcPhase,
        targetPhase: tgtPhase
      }
    }

    if(type == 'proj-phase'){
      const [projectId, phaseParams] = params.split(":")
      const [srcPhase, tgtPhase] = phaseParams.split(">")
      return{
        type: "project-phase-to-phase",
        projectId,
        sourcePhase: srcPhase,
        targetPhase: tgtPhase
      }
    }

    if(type == "edges"){
      const edgePairs = params.split(',').map(pair => {
        const [source, target] = pair.split('-')
        return {source, target}
      })
      return {
        type: 'explicit-edges',
        edges: edgePairs
      }
    }

    return { type: "unknown", raw: id}
  }

  const filterEdges = (allEdges, allNodes, parsedId) => {
    switch (parsedId.type){
      case 'project-to-project': {
        return allEdges.filter(edge => {
          const src = allNodes.find(n => n.id == edge.source)
          const tgt = allNodes.find(n => n.id == edge.target)
          if(!src || !tgt) return false;

          const matchSource = src.projectid === parsedId.sourceProject
          const matchTarget = parsedId.targetProject ? tgt.projectid === parsedId.targetProject : src.projectid !== tgt.projectid;

          return matchSource && matchTarget
        })
      }
      case 'phase-to-phase': {
        return allEdges.filter(edge => {
          const src = allNodes.find(n => n.id === edge.source)
          const tgt = allNodes.find(n => n.id === edge.target)
          if(!src || !tgt) return false;

          return src.phase === parsedId.sourcePhase && tgt.phase === parsedId.targetPhase
        })
      }
      case 'internal-phase-to-phase': {
        return allEdges.filter(edge => {
          const src = allNodes.find(n => n.id === edge.source)
          const tgt = allNodes.find(n => n.id === edge.target)
          if(!src || !tgt) return false
          
          const internal = src.projectid == tgt.projectid;
          internal && console.log(src, tgt)
          return internal && src.phase === parsedId.sourcePhase && tgt.phase === parsedId.targetPhase
        })
      }
      case 'external-phase-to-phase': {
        return allEdges.filter(edge => {
          const src = allNodes.find(n => n.id === edge.source)
          const tgt = allNodes.find(n => n.id === edge.target)
          if(!src || !tgt) return false
          
          const internal = src.projectid !== tgt.projectid;
          return internal && src.phase === parsedId.sourcePhase && tgt.phase === parsedId.targetPhase
        })
      }
      case 'project-phase-to-phase': {
        return allEdges.filter(edge => {
          const src = allNodes.find(n => n.id === edge.source)
          const tgt = allNodes.find(n => n.id === edge.target)
          if(!src || !tgt) return false
          
          const inProject = src.projectid === parsedId.projectId;
          return inProject && src.phase === parsedId.sourcePhase && tgt.phase === parsedId.targetPhase
        })
      }
      case 'explicit-edges': {
        return allEdges.filter(edge => {
          return parsedId.edges.some(e => {
            e.source === edge.source && e.target === edge.target
          })
        })
      }
      default:
        return [];
    }
  }

  const parsedId = useMemo(() => parseId(id), [id])
  const filteredEdges = useMemo(() => filterEdges(memoEdges, memoNodes, parsedId), [memoEdges, memoNodes, parsedId])

  return (
    <div style={{marginBottom: "30px"}}>
      <div style={{padding: "20px 20px 10px 20px"}}>
        { parsedId.type === "project-to-project" ?
          <h3>{filteredEdges.length} connection{filteredEdges.length > 1 && 's'} from <i>{findProjectName(parsedId.sourceProject)}</i> to {parsedId.targetProject != null ? <i>{findProjectName(parsedId.targetProject)}</i> : "all projects"}</h3>
          : parsedId.type === "phase-to-phase" ?
          <h3>{filteredEdges.length} connection{filteredEdges.length > 1 && 's'} from {phase_labels[parsedId.sourcePhase]} to {phase_labels[parsedId.targetPhase]}</h3>
          : parsedId.type === "project-phase-to-phase" ?
          <h3>{filteredEdges.length} connection{filteredEdges.length > 1 && 's'} within <i>{findProjectName(parsedId.projectId)}</i>, from {phase_labels[parsedId.sourcePhase]} to {phase_labels[parsedId.targetPhase]}</h3>
          : parsedId.type === 'internal-phase-to-phase' ?
          <h3>{filteredEdges.length} internal connection{filteredEdges.length > 1 && 's'} from {phase_labels[parsedId.sourcePhase]} to {phase_labels[parsedId.targetPhase]}</h3>
          : parsedId.type === 'external-phase-to-phase' ?
          <h3>{filteredEdges.length} cross-project connection{filteredEdges.length > 1 && 's'} from {phase_labels[parsedId.sourcePhase]} to {phase_labels[parsedId.targetPhase]}</h3>
          :
          <h3>Connections</h3>
        }
      </div>
      {filteredEdges.sort((a,b) => {
        const projecta = projects.find((p) => p.id == a.source.split("_")[0])
        const projectb = projects.find((p) => p.id == b.source.split("_")[0])
        return projectb.year.slice(-4) - projecta.year.slice(-4)
      }).map((edge, i) => {
        const sourceHighlight = hoveredItem.kind == "node" && hoveredItem.id == edge.source && hoveredItem.from !== `edgelist-${id}`
        const sourceHover = hoveredItem.kind == "node" && hoveredItem.id == edge.source && hoveredItem.from == `edgelist-${id}`
        const sourceFill = sourceHighlight ? "var(--blueblue)" : sourceHover ? "#000" : "#fff"

        const edgeHighlight = hoveredItem.kind == "edge" && hoveredItem.id == `${edge.source}-${edge.target}` && hoveredItem.from !== `edgelist-${id}`
        const edgeStroke = edgeHighlight ? "var(--blueblue)" : "#000"

        const targetHighlight = hoveredItem.kind == "node" && hoveredItem.id == edge.target && hoveredItem.from !== `edgelist-${id}`
        const targetHover = hoveredItem.kind == "node" && hoveredItem.id == edge.target && hoveredItem.from == `edgelist-${id}`
        const targetFill = targetHighlight ? "var(--blueblue)" : targetHover ? "#000" : "#fff"

        const sourceProject = edge.source.split("_")[0]
        const targetProject = edge.target.split("_")[0]
        return <div className="edgelist-item" style={{backgroundColor: edgeHighlight ? "var(--lightblue)" : null}}>
          <div style={{padding: "0 10px"}}>
            <div onClick={() => handleOpen("project", edge.source.split("_")[0], path)} 
                  onMouseEnter={(event) => {setHoveredItem({"kind": "project", "id": sourceProject, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
                  className="clickable hover-line">
                  <img src="./icons/icon_project.svg" height="10px"/> 
                  <span> {findProjectName(edge.source)}</span></div>
            <h3 onClick={() => handleOpen("node", edge.source, path)} 
                  onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": edge.source, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
                  className="clickable hover-line"><b>{edge.source.split("_")[1]} – {phase_labels[findNodeFromEdge(edge.source).phase]}</b></h3>
            <p>{memoNodes.find((n) => n.id === edge.source).short_desc}</p>
          </div>

          <div>
            <svg width="30px" height="30px">
              <circle cx="50%" cy="50%" r="calc(50% - 1px)" stroke="black" stroke-width={2} fill={sourceFill}
                  onClick={() => handleOpen("node", edge.source, path)} 
                  onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": edge.source, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                    <title>{edge.source.replace("_", " ")}</title>
              </circle>
            </svg>
          </div>

          <div onClick={() => handleOpen("edge", `${edge.source}-${edge.target}`, path)} className="clickable">
            <div><svg width="100%" height="30px">
              <line x1="0" x2="100%" y1="50%" y2="50%" stroke={edgeStroke} strokeWidth={2} strokeDasharray={sourceProject !== targetProject ? "5,5" : null}/>  
              <line x1="calc(100% - 15px)" x2="100%" y1="20%" y2="50%" stroke={edgeStroke} strokeWidth={2}/>
              <line x1="calc(100% - 15px)" x2="100%" y1="80%" y2="50%" stroke={edgeStroke} strokeWidth={2}/>
              <rect x="0" y="35%" width="100%" height="30%" fill="transparent"
                  onMouseEnter={(event) => {setHoveredItem({"kind": "edge", "id": `${edge.source}-${edge.target}`, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} >
                    <title>{`${edge.source.replace("_", " ")} – ${edge.target.replace("_", " ")}`}</title>
                </rect>
            </svg></div> 
            <div>{edge.long_desc.length > 0 ? <p>{edge.short_desc}</p> : <span className="smalltext">No connection description</span>}</div>
          </div>

          <div>
            <svg width="30px" height="30px">
              <circle cx="50%" cy="50%" r="calc(50% - 1px)" stroke="black" stroke-width={2} fill={targetFill}
                  onClick={() => handleOpen("node", edge.target, path)} 
                  onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": edge.target, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}} className="clickable">
                    <title>{edge.target.replace("_", " ")}</title>
              </circle>
            </svg>
          </div>

          <div style={{padding: "0 10px"}}>
            {/* <div onClick={() => handleOpen("node", edge.target, path)} className="clickable">&#9711; {edge.target}</div> */}
            <div onClick={() => handleOpen("project", edge.target.split("_")[0], path)} 
                  onMouseEnter={(event) => {setHoveredItem({"kind": "project", "id": targetProject, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
                  className="clickable hover-line">
                  <img src="./icons/icon_project.svg" height="10px"/>   
                  <span> {findProjectName(edge.target)}</span></div>
            <h3 onClick={() => handleOpen("node", edge.target, path)} 
                  onMouseEnter={(event) => {setHoveredItem({"kind": "node", "id": edge.target, "from": `edgelist-${id}`})}} 
                  onMouseLeave={(event) => {setHoveredItem({"kind": null, "id": null, "from": null})}}
                  className="clickable hover-line">{edge.target.split("_")[1]} – {phase_labels[findNodeFromEdge(edge.target).phase]}</h3>
            <p>{memoNodes.find((n) => n.id === edge.target).short_desc}</p>
          </div>
        </div>
      })}
    </div>
  )
}

export default EdgeList