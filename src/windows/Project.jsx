import {useEffect, useRef, useState, useCallback, useMemo} from 'react'
import * as d3 from "d3"
import projects from "../data/projects.js"
import nodes from "../data/nodes.js"
import edges from "../data/edges.js"

const Project = ({handleOpen, id, path, open, openTooltip, hoveredItem, setHoveredItem, setMaxMatrix}) => {

    const phase_order = ["PH", "DI", "UC", "FU", "VI", "DE", "TE"]
    const phase_labels = {
      PH: 'Phenomenon',
      DI: 'Dimensions',
      UC: 'Use Cases',
      FU: 'Functionalities',
      VI: 'Visualisation',
      DE: 'Development',
      TE: 'Testing'
    }

    const timelineRef = useRef();
    const matrixRef = useRef();

    const projectdata = useMemo(
      () => projects.find((p) => p.id == id),
      [projects])

    const nodedata = useMemo(
      () => nodes.filter((n) => n.projectid == id), 
      [nodes, id])

    const edgedata = useMemo(
      () => edges.filter(e => {
      const src = nodes.find(n => n.id == e.source)
      const tgt = nodes.find(n => n.id == e.target)
      return src?.projectid === id && tgt?.projectid === id
    }),
    [nodes, edges, id])

    const externalEdges = useMemo(
      () => edges.filter(edge => {
      const src = nodes.find(n => n.id === edge.source);
      const tgt = nodes.find(n => n.id === edge.target);
      return src?.projectid === id && tgt?.projectid !== id
    }), [nodes, edges, id])

    const [timeMode, setTimeMode] = useState(false)
    const [showMatrix, setShowMatrix] = useState(false)
    const [hoveredCell, setHoveredCell] = useState(null)

    const orders = useMemo(
      () => [...new Set(nodedata.map(n => n.order))].sort(), 
      [nodedata]);
    
    const phases = useMemo(
      () => phase_order.filter(p => nodedata.some(n => n.phase === p)),
      [nodedata])

    const COL_W = 40;
    const ROW_H = 40;
    const PAD_L = 110;
    const PAD_T = 20;
    const PAD_R = 30;
    const PAD_B = 10;

    const colWidths = useMemo(() => {
      const widths = {};

      orders.forEach(order => {
        const nodesInOrder = nodedata.filter(n => n.order === order)
        const maxLength = Math.max(...nodesInOrder.map(n => n.length || 1))

        widths[order] = timeMode ? COL_W * maxLength + 20 : COL_W 
      })
      return widths;
    }, [nodedata, orders, timeMode])

    const colStartX = useMemo(() => {
      const positions = {};
      let currentX = PAD_L;

      orders.forEach(order => {
        positions[order] = currentX;
        currentX += colWidths[order];
      })
      return positions;
    }, [orders, colWidths])

    // const tlW = PAD_L + orders.length * COL_W + PAD_R
    const tlH = PAD_T + phases.length * ROW_H + PAD_B

    const tlW = useMemo(() => {
      const totalColWidth = Object.values(colWidths).reduce((sum, w) => sum + w, 0)
      return PAD_L + totalColWidth + PAD_R
    }, [colWidths])

    // map order letter -> x center of that column
    const colX = useCallback(
      // order => PAD_L + orders.indexOf(order) * COL_W + COL_W /2,
      // [orders]
      order => colStartX[order] + COL_W / 2,
      [colStartX, colWidths]
      )
    const rowY = useCallback(
      phase => PAD_T + phases.indexOf(phase) * ROW_H + ROW_H /2,
      [phases]
      )
    const bracketRight = useCallback(
      // node => {
      //   const startIdx = orders.indexOf(node.order);
      //   const endIdx   = Math.min(startIdx + (node.length || 1) - 1, orders.length - 1);
      //   return PAD_L + endIdx * COL_W + COL_W;
      // },
      // [orders]
      node => {
        const nodeLength = node.length || 1;
        const startX = colStartX[node.order]
        return startX + (COL_W * nodeLength) + 10;
        // const startIdx = orders.indexOf(node.order)
        // const endIdx = startIdx;
        // return colStartX[node.order] + colWidths[node.order] - 5
      },
      [orders, colStartX, colWidths]
      );

  useEffect(() => { // draw the timeline
    if(!timelineRef.current || !nodedata.length) return;

    const svg = d3.select(timelineRef.current);
    svg.selectAll('*').remove();

    const grid = svg.append('g').attr('class', "project_grid");

    //vertical columns
    // orders.forEach((_, i) => {
    //   grid.append('line')
    //     .attr('x1', PAD_L + i * COL_W).attr('x2', PAD_L + i * COL_W)
    //     .attr('y1', PAD_T).attr('y2', tlH - PAD_B)
    //     .attr('stroke', '#cccccc').attr('stroke-width', 1)
    // })
    
    let cumulativeX = PAD_L;
    orders.forEach((order, i) => {
      grid.append('line')
        .attr('x1', cumulativeX)
        .attr('x2', cumulativeX)
        .attr('y1', PAD_T)
        .attr('y2', tlH - PAD_B)
        .attr('stroke', '#cccccc').attr('stroke-width', 1);
        cumulativeX += colWidths[order]
    })
    grid.append('line')
      .attr('x1', cumulativeX)
      .attr('x2', cumulativeX)
      .attr('y1', PAD_T).attr('y2', tlH - PAD_B)
      .attr('stroke', '#cccccc').attr('stroke-width', 1);

    //horizontal columns
    phases.forEach((_, i) => {
      grid.append('line')
        .attr('x1', PAD_L).attr('x2', tlW - PAD_R)
        .attr('y1', PAD_T + i * ROW_H).attr('y2', PAD_T + i * ROW_H)
        .attr('stroke', '#cccccc').attr('stroke-width', 1);
    });
    grid.append('line')
      .attr('x1', PAD_L).attr('x2', tlW - PAD_R)
      .attr('y1', PAD_T + phases.length * ROW_H)
      .attr('y2', PAD_T + phases.length * ROW_H)
      .attr('stroke', '#cccccc').attr('stroke-width', 1);

    // phase labels
    phases.forEach(phase => {
      const y = rowY(phase)

      svg.append('text')
        .attr('x', PAD_L - 12).attr('y', y)
        .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
        .attr('font-size', 12)
        .attr('fill', "black")
        .text(phase_labels[phase])
        .on('mouseenter', (e) => {openTooltip(e, phase)})
        .on('mouseleave', (e) => {openTooltip(e, 'close')})
    })

    svg.append('text')
      .attr('x', PAD_L)
      .attr('y', PAD_T - 6)
      .attr('font-size', 10)
      .attr('fill', '#999')
      .text('time →')

    // draw edges 
    const edgeGroup = svg.append('g').attr('class', "project-edges")

    externalEdges.forEach((edge) => {
      const src = nodedata.find(n => n.id === edge.source)
      const tgt = nodes.find(n => n.id === edge.target)
      if(!src || !tgt) return;

      const x1 = colX(src.order), y1 = rowY(src.phase);
      const x2 = timeMode ? bracketRight(src) : colX(src.order)+COL_W/2
      // const y2 = rowY(src.phase)-COL_W/2
      // const y2 = rowY(tgt.phase)
      const y2 = PAD_T
      const mx = (x1 + x2) / 2
      const my = y1 - 10

      const externalPath = edgeGroup.append('path')
            .datum({...edge, "src": src, "tgt": tgt, "isExternal": true})
            .attr('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`)
            .attr('fill', "none")
            .attr('stroke', "#999999")
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', '5,3')
            .attr('opacity', 0.7)
            .attr('class', (data) => `project-edge-external`)
            .attr('id', (data) => `project-edge-external-${data.source}-${data.target}`)
            .style('cursor', 'pointer')
            // .on("click", (event, data) => {handleOpen("edge", `${data.source}-${data.target}`, path)});

      edgeGroup.append('path')
            .datum({...edge, "src": src, "tgt": tgt, "isExternal": true})
            .attr('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`)
            .attr('fill', "none")
            .attr('stroke', "transparent")
            .attr('stroke-width', 8)
            .attr('class', `project-edge-external-trans`)
            .style('cursor', 'pointer')
            .on("click", (event, data) => {handleOpen("edge", `${data.source}-${data.target}`, path)})
            .on("mouseenter", (event, data) => {
              setHoveredItem({"kind": "edge", "id": `${data.source}-${data.target}`, "from": `project-${id}`})
              d3.select(`#project-edge-external-${data.source}-${data.target}`)
                .attr("stroke-width", 3)
            })
            .on("mouseleave", (event, data) => {
              setHoveredItem({"kind": null, "id": null, "from": null})
              d3.select(`#project-edge-external-${data.source}-${data.target}`)
                .attr("stroke-width", 1.5)
            })
            .append('title').text(`${src.id.replace("_", " ")} → ${tgt.id.replace("_", " ")}\nin ${projects.find((p) => p.id == tgt.id.split("_")[0]).title}`)

      const externalnode = edgeGroup.append('circle')
          .datum({"tgt": tgt, "isExternal": true})
          .attr("class", "hoverfill")
          .attr('cx', x2)
          .attr('cy', y2)
          .attr('r', 4)
          .attr('fill', '#fff')
          .attr('stroke', "#999")
          .attr('stroke-width', 1.5)
          .style('cursor', 'pointer')
          .on('click', (event, data) => {handleOpen('node', `${tgt.id}`, path)})
          .on("mouseenter", function(event, data){
            setHoveredItem({"kind": "node", "id": `${tgt.id}`, "from": `project-${id}`})
              d3.select(this)
                .attr('fill', "#999")
          })
          .on("mouseleave", function(event, data){
              setHoveredItem({"kind": null, "id": null, "from": null})
              d3.select(this)
                .attr('fill', "#fff")
          })
          .append('title').text(`${tgt.id.replace("_", " ")} in ${projects.find((p) => p.id == tgt.id.split("_")[0]).title}`)
    })

    edgedata.forEach((edge) => {
      const src = nodedata.find(n => n.id === edge.source)
      const tgt = nodedata.find(n => n.id === edge.target)
      if(!src || !tgt) return;

      const x1 = timeMode ? bracketRight(src) : colX(src.order)
      const y1 = rowY(src.phase)
      const x2 = colX(tgt.order), y2 = rowY(tgt.phase)

      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18

      const isHighlighted = hoveredCell && src.phase === hoveredCell.srcPhase && tgt.phase === hoveredCell.tgtPhase;
      const isDimmed = hoveredCell && !isHighlighted
      
      const stroke = isDimmed ? "#1e1e2e" : isHighlighted ? "#1500ff" : "#444460"
      const opacity = isDimmed ? 0.15 : isHighlighted ? 1 : 1;
      const sw = isHighlighted ? 2 : 1;

      edgeGroup.append('path')
        .datum({...edge, "src": src, "tgt": tgt})
        .attr('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`)
        .attr('fill', "none")
        .attr('stroke', "#444460")
        .attr('stroke-width', 1)
        .attr('opacity', 1)
        .attr('class', `project-edge project-edge-${src.phase}-${tgt.phase}`)
        .attr('id', (d) => `project-edge-${d.source}-${d.target}`)
      
      edgeGroup.append('path')
        .datum({...edge, "src": src, "tgt": tgt})
        .attr('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`)
        .attr('fill', "none")
        .attr('stroke', "transparent")
        .attr('stroke-width', 8)
        .attr('class', `project-edge-trans project-edge-${src.phase}-${tgt.phase}-trans`)
        .style('cursor', 'pointer')
        .on("click", (event, data) => {handleOpen("edge", `${data.source}-${data.target}`, path)}) // FUNCTION HERE FOR OPENING EDGE FRAME
        .on("mouseenter", (event, data) => {
          setHoveredItem({"kind": "edge", "id": `${data.source}-${data.target}`, "from": `project-${id}`})
          d3.select(`#project-edge-${data.source}-${data.target}`)
            .attr("stroke-width", 4)
        })
        .on("mouseleave", (event, data) => {
          setHoveredItem({"kind": null, "id": null, "from": null})
          d3.select(`#project-edge-${data.source}-${data.target}`)
            .attr("stroke-width", 1)
        })
        .append('title').text(`${src.id.replace("_", " ")} → ${tgt.id.replace("_", " ")}`);

    })

    const nodeGroup = svg.append('g').attr('class', "project-nodes")
    const RADIUS = 10;

    nodedata.forEach((node) => {
      const cx = colX(node.order);
      const cy = rowY(node.phase);
      const color = "#000000"
      const g = nodeGroup.append('g').datum(node).attr("class", "project-node")

      if(timeMode){
        const rx = bracketRight(node)

        g.append('line') // dashed line time
          .attr('x1', cx + RADIUS).attr('y1', cy)
          .attr('x2', rx - 4).attr('y2', cy)
          .attr('stroke', color).attr('stroke-width', 2)
          .attr('opacity', 0.8)
          .attr('stroke-dasharray', '3,3');

        //  g.append('line') // dashed line endcap
        //   .attr('x1', rx).attr('y1', cy - 8)
        //   .attr('x2', rx).attr('y2', cy + 8)
        //   .attr('stroke', color).attr('stroke-width', 2)
        //   .attr('opacity', 0.8);
        g.append('circle')
          .attr('cx', rx)
          .attr('cy', cy)
          .attr('r', 4)
      }

      g.append('circle')
        .attr('cx', cx).attr('cy', cy)
        .attr('r', RADIUS)
        .attr("class", 'hoverfill')
        .attr('fill', '#ffffff')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on("mouseenter", function(event, data){
            setHoveredItem({"kind": "node", "id": data.id, 'from': `project-${id}`}),
             d3.select(this)
                .attr('fill', "#000")
          })
        .on("mouseleave", function(event, data){
            setHoveredItem({"kind": null, "id": null, "from": null}),
              d3.select(this)
                .attr('fill', "#fff")
          })

      g.on("click", (event, data) => {handleOpen("node", data.id, path)})

      g.append('title').text(`${node.id.replace("_", " ")}\n${phase_labels[node.phase] || node.phase}`);
    })  

  }, [nodedata, edgedata, timeMode, orders, phases, colX, rowY, bracketRight, open])

  useEffect(() => { // hover effect timeline
      const isHighlighted = (d) => hoveredCell && d.src.phase === hoveredCell.srcPhase && d.tgt.phase === hoveredCell.tgtPhase;
      const isDimmed = (d) => hoveredCell && !isHighlighted(d)

      const svg = d3.select(timelineRef.current);

        svg.selectAll('.project-edge')
          .attr('stroke', (d) => isDimmed(d) ? "#1e1e2e" : isHighlighted(d) ? "#1500ff" : "#444460")
          .attr('stroke-width', (d) => isHighlighted(d) ? 2 : 1)
          .attr('opacity', (d) => isDimmed(d) ? 0.15 : isHighlighted(d) ? 1 : 1)

        svg.selectAll(".project-edge-external")
          .attr("stroke", (d) => isDimmed(d) ? "#ccc" : isHighlighted(d) ? "#1500ff" : "#999")
    
  }, [hoveredCell])

  useEffect(() => {
    const svg = d3.select(timelineRef.current);

    svg.selectAll(".hoverfill")
      .attr("fill", (d) => {
        if(d.isExternal){
          if(hoveredItem.kind == "node" && hoveredItem.id == d.tgt.id){
            if(hoveredItem.from == `project-${id}`){return "#999"}
            else{return "var(--blueblue)"}
          }
          return "#fff"
        }else{
          if(hoveredItem.kind == "node" && hoveredItem.id == d.id){
            if(hoveredItem.from == `project-${id}`){return "#000"}
            else{return "var(--blueblue)"}
          }
          return "#fff"
        }
      })
    
    svg.selectAll(".project-edge-external")
      .attr("stroke", (data) => {
        if(hoveredItem.kind == "edge" && hoveredItem.id == `${data.source}-${data.target}`){
          if(hoveredItem.from == `project-${id}`){
            return "#999"
          } else{
            return "var(--blueblue)"
          }
        } else{
          return "#999"
        }
      })

      svg.selectAll(".project-edge")
      .attr("stroke", (data) => {
        if(hoveredItem.kind == "edge" && hoveredItem.id == `${data.source}-${data.target}`){
          if(hoveredItem.from == `project-${id}`){
            return "#000"
          } else{
            return "var(--blueblue)"
          }
        } else{
          return "#000"
        }
      })
  }, [hoveredItem])

  useEffect(() => { // draw the matrix
    if(!matrixRef.current || !nodedata.length) return;

    const svg = d3.select(matrixRef.current)
    svg.selectAll("*").remove()

    const allPhases = phase_order.filter(p => nodedata.some(n => n.phase === p))
    const n = allPhases.length;

    const CELL = 30;
    const LABEL = 30;
    const PAD = 10;

    const mW = LABEL + n * CELL + PAD;
    const mH = LABEL + n * CELL + PAD;

    svg.attr('width', mW)
      .attr("height", mH)

    const counts = {};
    allPhases.forEach(a => {
      counts[a] = {};
      allPhases.forEach(b => { counts[a][b] = 0})
    })

    edgedata.forEach(edge => {
      const src = nodedata.find(nd => nd.id === edge.source)
      const tgt = nodedata.find(nd => nd.id === edge.target)
      if(src && tgt && counts[src.phase] && counts[src.phase][tgt.phase] !== undefined){
        counts[src.phase][tgt.phase]++
      }
    })

    externalEdges.forEach(edge => {
      const src = nodedata.find(nd => nd.id === edge.source)
      const tgt = nodes.find(nd => nd.id === edge.target)
      if(src && tgt && counts[src.phase] && counts[src.phase][tgt.phase] !== undefined){
        counts[src.phase][tgt.phase]++
      }
    })

    const maxCount = Math.max(1, d3.max(allPhases.flatMap(a => allPhases.map(b => counts[a][b]))))
    setMaxMatrix(maxCount)

    // column/target labels top
    allPhases.forEach((phase, j) => {
      const x = PAD + LABEL + j * CELL + CELL / 2;

      svg.append('text')
        .attr('x', x).attr('y', PAD + LABEL - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10).attr('font-family', "'DM Mono', monospace")
        .attr('fill', "#000")
        .text(phase)
        .on('mouseenter', (e) => {openTooltip(e, phase)})
        .on('mouseleave', (e) => {openTooltip(e, 'close')})
    });
    // row/source labels left
    allPhases.forEach((phase, i) => {
        const y = PAD + LABEL + i * CELL + CELL / 2;

        svg.append('text')
          .attr('x', PAD + LABEL - 10).attr('y', y)
          .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
          .attr('font-size', 10).attr('font-family', "'DM Mono', monospace")
          .attr('fill', "#000")
          .text(phase)
          .on('mouseenter', (e) => {openTooltip(e, phase)})
          .on('mouseleave', (e) => {openTooltip(e, 'close')})
      });

    svg.append('text')
      .attr('x', 0).attr('y', LABEL + 8)
      .attr('text-anchor', 'start')
      .attr('font-size', 9).attr('font-family', "'DM Mono', monospace")
      .attr('fill', '#9191a7')
      .text('source ↓');

    svg.append('text')
      .attr('x', 0).attr('y', LABEL - 4)
      .attr('text-anchor', 'start')
      .attr('font-size', 9).attr('font-family', "'DM Mono', monospace")
      .attr('fill', '#9191a7')
      .text('target →');

    // cells
      allPhases.forEach((srcPhase, i) => {
        allPhases.forEach((tgtPhase, j) => {
          const count = counts[srcPhase][tgtPhase]
          const x = PAD + LABEL + j * CELL
          const y = PAD + LABEL + i * CELL

          const isHovered = hoveredCell && hoveredCell.srcPhase === srcPhase && hoveredCell.tgtPhase === tgtPhase;
          const alpha = count === 0 ? 1 : 0.15 + (count / maxCount) * 0.75;
          
          const cellG = svg.append('g')
            .datum({srcPhase, tgtPhase, count})
            .attr('class', 'matrix-cell')
            .style('cursor', count > 0 ? 'pointer' : 'default');

          cellG.append('rect')
          .attr('x', x + 1).attr('y', y + 1)
          .attr('width', CELL - 2).attr('height', CELL - 2)
          .attr('opacity', 1)
          .attr('stroke', "#cccccc")
          .attr('stroke-width', 1)
          .attr('fill', count === 0 ? '#ffffff' : `rgba(0,0,0,${alpha})`)
          .attr('rx', 2)
          .append('title').text(count > 0 ? `${phase_labels[srcPhase]} → ${phase_labels[tgtPhase]}\nTotal count: ${count}` : '')

          cellG.on('mouseenter', () => {
            if(count > 0) setHoveredCell({ srcPhase, tgtPhase })
          }).on('mouseleave', () => setHoveredCell(null))
            .on('click', (event, data) => count > 0 && handleOpen("edgelist", `proj-phase:${id}:${data.srcPhase}>${data.tgtPhase}`, path))
        })
      })
  }, [showMatrix, nodedata, edgedata, phases])

  useEffect(() => {
    if(!matrixRef.current) return;

    const svg = d3.select(matrixRef.current);

    svg.selectAll(".matrix-cell rect")
      .attr('stroke', d => {
        if(!hoveredCell) return "#cccccc"
        return d.srcPhase === hoveredCell.srcPhase && d.tgtPhase === hoveredCell.tgtPhase ? "#000dff" : '#cccccc'
      })
      .attr("stroke-width", d => {
        if(!hoveredCell) return 1;
        return d.srcPhase === hoveredCell.srcPhase && d.tgtPhase === hoveredCell.tgtPhase ? 3 : 1
      })
  }, [hoveredCell])

  return (
      <>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div id="project-information">
          <div>
            <h1>{projectdata.title}</h1>
            <div>{projectdata.year}</div>
            <div><p>{projectdata.cont}</p></div>
            <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
            {projectdata.links.tool.length > 0 && <div className="button"><a href={projectdata.links.tool} target="_blank">open tool &#8599;</a></div>}
            {projectdata.links.paper.length > 0 && <div className="button"><a href={projectdata.links.paper} target="_blank">read paper &#8599;</a></div>}
            {projectdata.links.other.length > 0 && <div className="button"><a href={projectdata.links.other} target="_blank">link &#8599;</a></div>}
            </div>
          </div>
          <div>
            <p>{projectdata.long_desc}</p>
          </div>
        </div>
        <div id="project-timelinecontainer" style={{width: "100%", maxWidth: "100%", borderTop: "1px solid var(--linegray)", padding: "10px 0 40px 20px"}}>
          <div style={{maxWidth: "100%"}}>
            {nodedata.length ? <div id="project-vizbtns">
              <div className="button" onClick={() => setShowMatrix(prev => !prev)}>{showMatrix ? 'Hide matrix' : 'Show matrix'}</div>
            
              <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                <div className="info-button" onMouseEnter={(e) => openTooltip(e, "projectinfo")} onMouseLeave={(e) => openTooltip(e, "close")}>i</div>
                <div className="button" onClick={() => setTimeMode(prev => !prev)}>{timeMode ? 'Hide duration' : 'Show duration'}</div>
              </div>
            </div>
            : <div className="smalltext">No available design phase data</div>}
            <div id="project-viz-container">
              {showMatrix && <div style={{marginTop: "10px"}}>
                <div className="info-button" onMouseEnter={(e) => openTooltip(e, "projectmatrixinfo")} onMouseLeave={(e) => openTooltip(e, "close")}>i</div>
                <svg ref={matrixRef}/>
              </div>}
              <div style={{width: "100%", overflow: "hidden"}}>
                <div style={{width: "100%", overflow: "scroll"}}>
                  <svg ref={timelineRef} width={tlW} height = {tlH} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      </>
  )
}

export default Project