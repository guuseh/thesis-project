import {useEffect, useRef, useState, useMemo} from 'react'
import * as d3 from 'd3'
import projects from "../data/projects.js"
import nodes from "../data/nodes.js"
import edges from "../data/edges.js"

const Matrix = ({handleOpen, path, openTooltip, hoveredItem, setHoveredItem, setMaxMatrix, open}) => {

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

    const svgRef = useRef(null)
    const containerRef = useRef();
    const [matrixMode, setMatrixMode] = useState('project')
    const [size, setSize] = useState({ width: 600, height: 600})

    const validNodes = useMemo(() => nodes.filter(n => n.id), [])
    const validEdges = useMemo(() => edges.filter(e => e.source && e.target), [])

    const [phaseEdges, setPhaseEdges] = useState('all') // 'internal' / 'external' 


  useEffect(() => {
     if(!containerRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            if(entries[0]){
                const { width, height } = entries[0].contentRect;
                setSize({width, height})
            }
        })
        resizeObserver.observe(containerRef.current.parentElement)

        return() => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if(!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    
    const LABEL = 50;
    const PAD = 20;

    if(matrixMode === 'project'){
      const minSize = Math.min(size.width, size.height-80)
      const projectIds = projects.map(p => p.id)
      const n = projectIds.length;
      
      const CELL = (minSize - LABEL - PAD*3) / n;

      const mW = LABEL + n * CELL + PAD;
      const mH = LABEL + n * CELL + PAD;

      svg.attr('width', mW).attr('height', mH);

      const counts = {}
      projectIds.forEach(a => {
        counts[a] = {};
        projectIds.forEach(b => {
          counts[a][b] = 0;
        })
      })

      validEdges.forEach(edge => {
        const srcNode = validNodes.find(n => n.id === edge.source)
        const tgtNode = validNodes.find(n => n.id === edge.target)

        if(!srcNode || !tgtNode) return;

        const srcProject = srcNode.projectid
        const tgtProject = tgtNode.projectid 

        if(srcProject !== tgtProject && counts[srcProject] && counts[srcProject][tgtProject] !== undefined){
          counts[srcProject][tgtProject]++
        }
      })

      const maxCount = Math.max(1, d3.max(projectIds.flatMap(a => projectIds.map(b => counts[a][b]))))
      setMaxMatrix(maxCount)

      projectIds.forEach((projectId, j) => {
        const x = LABEL + j * CELL + CELL / 2;
        const project = projects.find(p => p.id === projectId)
        const color = "#000"

        const label = svg.append('text')
          .attr('x', x).attr('y', LABEL - 10)
          .attr('text-anchor', 'middle')
          .attr('font-size', 11)
          .attr('font-weight', '600')
          .attr('fill', color)
          .attr('cursor', 'pointer')
          .text(projectId);

        label.on("click", () => handleOpen("project", projectId, path))
              .on("mouseenter", (e) => {setHoveredItem({"kind": "project", "id": projectId, "from": "matrix-projects"}), openTooltip(e, "title", project.title)})
              .on("mouseleave", (e) => {setHoveredItem({"kind": null, "id": null, "from": null}), openTooltip(e, 'close')})
      })


      projectIds.forEach((projectId, i) => {
        const y = LABEL + i * CELL + CELL / 2;
        const project = projects.find(p => p.id === projectId);
        const color = "#000";

        const label = svg.append('text')
          .attr('x', LABEL - 12).attr('y', y + 4)
          .attr('text-anchor', 'end')
          .attr('font-size', 11)
          .attr('font-weight', '600')
          .attr('fill', color)
          .attr("cursor", "pointer")
          .text(projectId);

        label.on("click", () => handleOpen("project", projectId, path))
              .on("mouseenter", (e) => {setHoveredItem({"kind": "project", "id": projectId, "from": "matrix-projects"}), openTooltip(e, "title", project.title)})
              .on("mouseleave", (e) => {setHoveredItem({"kind": null, "id": null, "from": null}), openTooltip(e, 'close')})
      });

      svg.append('text')
        .attr('x', 0).attr('y', LABEL)
        .attr('text-anchor', 'start')
        .attr('font-size', 10)
        .attr('fill', '#999')
        .text('source ↓');
        
      svg.append('text')
        .attr('x', 0).attr('y', LABEL - 12)
        .attr('text-anchor', 'start')
        .attr('font-size', 10)
        .attr('fill', '#999')
        .text('target →');

      projectIds.forEach((srcProject, i) => {
        projectIds.forEach((tgtProject, j) => {
          const count = counts[srcProject][tgtProject];
          const x = LABEL + j * CELL;
          const y = LABEL + i * CELL;

          const srcColor = "#000";
          const alpha = count === 0 ? 0 : 0.2 + (count / maxCount) * 0.7;

          const cellG = svg.append('g')
            .style('cursor', count > 0 ? 'pointer' : 'default')
            .datum({ srcProject, tgtProject, count });

          // Background
          cellG.append('rect')
            .attr('x', x + 1).attr('y', y + 1)
            .attr('width', CELL - 2).attr('height', CELL - 2)
            .attr('fill', count === 0 ? '#fff' : `rgba(0,0,0,${alpha})`)
            .attr('stroke', "#cccccc")
            .attr('stroke-width', 1)
            .attr('rx', 2)
            .append('title').text(count > 0 ? `${projects.find((p) => p.id == srcProject).title} → ${projects.find((p) => p.id == tgtProject).title}\nTotal count: ${count}` : '')

          // Hover + Click
          cellG
            .on('mouseenter', function() {
              if (count === 0) return;
              d3.select(this).select('rect')
                .attr('stroke', '#000dff')
                .attr('stroke-width', 3);
            })
            .on('mouseleave', function() {
              d3.select(this).select('rect')
                .attr('stroke', "#cccccc")
                .attr('stroke-width', 1)
            })
            .on('click', function(event, d) {
              if (d.count === 0) return;
              
              // Filter edges: cross-project from srcProject to tgtProject
              const filteredEdges = validEdges.filter(edge => {
                const src = validNodes.find(n => n.id === edge.source);
                const tgt = validNodes.find(n => n.id === edge.target);
                return src?.projectid === d.srcProject && tgt?.projectid === d.tgtProject;
              });

              // Open EdgeList with filtered edges
              // const edgeIds = filteredEdges.map(e => `${e.source}-${e.target}`).join(',');
              handleOpen('edgelist', `proj:${d.srcProject}>${d.tgtProject}`, path);
            });
        });
      });
    } else{
      const minSize = Math.min(size.width, size.height-110)
      const allPhases = phase_order.filter(p => validNodes.some(n => n.phase === p));
      const n = allPhases.length;

      const CELL = (minSize - LABEL - PAD*3) / n;
      const mW = LABEL + n * CELL + PAD;
      const mH = LABEL + n * CELL + PAD;

      svg.attr('width', mW).attr('height', mH);

      // Count edges per (srcPhase, tgtPhase) pair across ALL projects
      const counts = {};
      allPhases.forEach(a => {
        counts[a] = {};
        allPhases.forEach(b => {
          counts[a][b] = 0;
        });
      });

      if(phaseEdges == 'internal'){
        validEdges.filter((e) => e.source.split("_")[0] == e.target.split("_")[0]).forEach(edge => {
          const srcNode = validNodes.find(n => n.id === edge.source);
          const tgtNode = validNodes.find(n => n.id === edge.target);

          if (!srcNode || !tgtNode) return;

          const srcPhase = srcNode.phase;
          const tgtPhase = tgtNode.phase;

          if (counts[srcPhase] && counts[srcPhase][tgtPhase] !== undefined) {
            counts[srcPhase][tgtPhase]++;
          }
        });
      } else if(phaseEdges == 'external'){
          validEdges.filter((e) => e.source.split("_")[0] !== e.target.split("_")[0]).forEach(edge => {
            const srcNode = validNodes.find(n => n.id === edge.source);
            const tgtNode = validNodes.find(n => n.id === edge.target);

            if (!srcNode || !tgtNode) return;

            const srcPhase = srcNode.phase;
            const tgtPhase = tgtNode.phase;

            if (counts[srcPhase] && counts[srcPhase][tgtPhase] !== undefined) {
              counts[srcPhase][tgtPhase]++;
            }
          });
      } else{
        validEdges.forEach(edge => {
          const srcNode = validNodes.find(n => n.id === edge.source);
          const tgtNode = validNodes.find(n => n.id === edge.target);

          if (!srcNode || !tgtNode) return;

          const srcPhase = srcNode.phase;
          const tgtPhase = tgtNode.phase;

          if (counts[srcPhase] && counts[srcPhase][tgtPhase] !== undefined) {
            counts[srcPhase][tgtPhase]++;
          }
       });
      }

      const maxCount = Math.max(1, d3.max(allPhases.flatMap(a => allPhases.map(b => counts[a][b]))));
      setMaxMatrix(maxCount)

      // Column labels (target phases) - top
      allPhases.forEach((phase, j) => {
        const x = LABEL + j * CELL + CELL / 2;
        const color = "#000";

        svg.append('text')
          .attr('x', x).attr('y', LABEL - 12)
          .attr('text-anchor', 'middle')
          .attr('font-size', 11)
          .attr('font-weight', '600')
          .attr('fill', color)
          .text(phase)
          .on('mouseenter', (e) => {openTooltip(e, phase)})
          .on('mouseleave', (e) => {openTooltip(e, 'close')})   
      });

      // Row labels (source phases) - left
      allPhases.forEach((phase, i) => {
        const y = LABEL + i * CELL + CELL / 2;
        const color = "#000";

        svg.append('text')
          .attr('x', LABEL - 12).attr('y', y)
          .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
          .attr('font-size', 11)
          .attr('font-weight', '600')
          .attr('fill', color)
          .text(phase)
          .on('mouseenter', (e) => {openTooltip(e, phase)})
          .on('mouseleave', (e) => {openTooltip(e, 'close')})
      });

      // Axis labels
      svg.append('text')
        .attr('x', 0).attr('y', LABEL)
        .attr('text-anchor', 'start')
        .attr('font-size', 10)
        .attr('fill', '#999')
        .text('source ↓');
        
      svg.append('text')
        .attr('x', 0).attr('y', LABEL - 12)
        .attr('text-anchor', 'start')
        .attr('font-size', 10)
        .attr('fill', '#999')
        .text('target →');

      // Cells
      allPhases.forEach((srcPhase, i) => {
        allPhases.forEach((tgtPhase, j) => {
          const count = counts[srcPhase][tgtPhase];
          const x = LABEL + j * CELL;
          const y = LABEL + i * CELL;

          const srcColor = "#000";
          const alpha = count === 0 ? 0 : 0.2 + (count / maxCount) * 0.7;

          const cellG = svg.append('g')
            .style('cursor', count > 0 ? 'pointer' : 'default')
            .datum({ srcPhase, tgtPhase, count });

          // Background
          cellG.append('rect')
            .attr('x', x + 1).attr('y', y + 1)
            .attr('width', CELL - 2).attr('height', CELL - 2)
            .attr('fill', count === 0 ? '#fff' : `rgba(0,0,0,${alpha})`)
            .attr('stroke', "#cccccc")
            .attr('stroke-width', 1)
            .attr('rx', 2)
            .append('title').text(count > 0 ? `${phase_labels[srcPhase]} → ${phase_labels[tgtPhase]}\nTotal count: ${count}` : '')

          // Hover + Click
          cellG
            .on('mouseenter', function() {
              if (count === 0) return;
              d3.select(this).select('rect')
                .attr('stroke', '#000dff')
                .attr('stroke-width', 3);
            })
            .on('mouseleave', function() {
              d3.select(this).select('rect')
                .attr('stroke', "#cccccc")
                .attr('stroke-width', 1)
            })
            .on('click', function(event, d) {
              if (d.count === 0) return;

              // Filter edges: srcPhase to tgtPhase
              const filteredEdges = validEdges.filter(edge => {
                const src = validNodes.find(n => n.id === edge.source);
                const tgt = validNodes.find(n => n.id === edge.target);
                return src?.phase === d.srcPhase && tgt?.phase === d.tgtPhase;
              });
              if(phaseEdges == 'internal'){
                handleOpen('edgelist', `internalphase:${d.srcPhase}>${d.tgtPhase}`, path);
              } else if(phaseEdges == 'external'){
                handleOpen('edgelist', `externalphase:${d.srcPhase}>${d.tgtPhase}`, path);
              } else{
                handleOpen('edgelist', `phase:${d.srcPhase}>${d.tgtPhase}`, path);
              }
              // Open EdgeList with filtered edges
              // const edgeIds = filteredEdges.map(e => `${e.source}-${e.target}`).join(',');
              
            });
        });
      });
    }
  }, [matrixMode, size, validNodes, validEdges, phaseEdges, open])

  return (
    <div ref={containerRef} style={{margin: 20}}>
      <div id="matrixview-buttons">
          <div className="button" style={{backgroundColor: matrixMode == "project" ? "var(--blueblue)" : "var(--lightblue)", color: matrixMode == "project" ? "white" : "black"}} onClick={() => setMatrixMode("project")}>Projects</div>
          <div className="button" style={{backgroundColor: matrixMode == "phase" ? "var(--blueblue)" : "var(--lightblue)", color: matrixMode == "phase" ? "white" : "black"}} onClick={() => setMatrixMode("phase")}>Phases</div>
          <div className="info-button" onMouseEnter={(e) => openTooltip(e, "matrixinfo")} onMouseLeave={(e) => openTooltip(e, "close")}>i</div>
      </div>

      <div className="smalltext" style={{width: "fit-content", margin: "0 auto 0 auto"}}>
        {matrixMode == "project" ? "Showing the amount of connections between two projects." : "Showing the amount of connections between two phases within and across all projects."}
      </div>
      {matrixMode == "phase" &&
      <div style={{display: 'flex', gap: '5px', width: '100%', fontSize: '10px', justifyContent: 'center', marginTop: 5}}>
        <div className="button" style={{backgroundColor: phaseEdges == "all" ? "var(--blueblue)" : "var(--lightblue)", color: phaseEdges == "all" ? "white" : "black"}} onClick={() => setPhaseEdges('all')}>All connections</div>
        <div className="button" style={{backgroundColor: phaseEdges == "internal" ? "var(--blueblue)" : "var(--lightblue)", color: phaseEdges == "internal" ? "white" : "black"}} onClick={() => setPhaseEdges('internal')}>Only internal connections</div>
        <div className="button" style={{backgroundColor: phaseEdges == "external" ? "var(--blueblue)" : "var(--lightblue)", color: phaseEdges == "external" ? "white" : "black"}} onClick={() => setPhaseEdges('external')}>Only cross-project connections</div>
      </div>}
      
      <svg ref={svgRef} style={{ display: 'block', margin: '0 auto' }} />

       <div className="view-switch-btns">
          <div onClick={() => handleOpen("view", "list", path)} className="white-button">Open List</div>
          <div onClick={() => handleOpen("view", "map", path)} className="white-button">Open Map</div>
        </div>
    </div>
  )
}

export default Matrix