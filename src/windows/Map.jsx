import {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import projects from "../data/projects.js"
import nodes from "../data/nodes.js"
import edges from "../data/edges.js"


const MapView = ({handleOpen, bringToFront, path, open, openTooltip, hoveredItem, setHoveredItem}) => {
  const svgRef = useRef(null);
  const containerRef = useRef();
  const [viewMode, setViewMode] = useState('overview');
  let mapFrame = open.filter((i) => i.kind == "view" && i.id == "map")[0]
  const [dimensions, setDimensions] = useState({width: mapFrame.w || window.innerWidth*0.4, height: mapFrame.h || window.innerHeight*0.5})
  // const [dimensions, setDimensions] = useState({width: "100%", height: "100%"})
  const simulationRef = useRef(null);

  const phase_labels = {
      PH: 'Phenomenon',
      DI: 'Dimensions',
      UC: 'Use Cases',
      FU: 'Functionalities',
      VI: 'Visualisation',
      DE: 'Development',
      TE: 'Testing'
    }



  const getProjectLevelData = (nodes, edges) => {
    const validNodes = nodes.filter(n => n.id)
    const validEdges = edges.filter(e => e.source && e.target)
    // const projectIds = [...new Set(validNodes.map(n => n.projectid))]
    const projectIds = [...new Set(projects.map(p => p.id))]

    const projectNodes = projectIds.map(projectId => {
      const projectInfo = projects.find(p => p.id === projectId) || {};
      const phaseCount = validNodes.filter(n => n.projectid === projectId).length
      return {
        "id": projectId,
        "type": "project",
        "title": projectInfo.title || projectId,
        phaseCount,
        year: projectInfo.year,
        "desc": projectInfo.short_desc
      }
    })

    const edgeMap = new Map();

    validEdges.forEach(edge => {
      const sourceNode = validNodes.find(n => n.id === edge.source)
      const targetNode = validNodes.find(n => n.id === edge.target)

      if(!sourceNode || !targetNode) return;

      const sourceProject = sourceNode.projectid 
      const targetProject = targetNode.projectid;

      if(sourceProject === targetProject) return;

      const key = `${sourceProject}-${targetProject}`
      if(!edgeMap.has(key)){
        edgeMap.set(key, {
          "source": sourceProject,
          "target": targetProject,
          "count": 0,
          "edgeDetails": []
        })
      }
      edgeMap.get(key).count++;
      edgeMap.get(key).edgeDetails.push(edge)
    })

    const projectEdges = Array.from(edgeMap.values())

    return { "nodes": projectNodes, "edges": projectEdges}
  }

  const getDetailLevelData = (nodes, edges) => {
    const validNodes = nodes.filter(n => n.id);
    const validEdges = edges.filter(e => e.source && e.target);

    const enhancedEdges = validEdges.map(edge => { // check if edge is cross project
      const sourceNode = validNodes.find(n => n.id === edge.source)
      const targetNode = validNodes.find(n => n.id === edge.target);
      return {
        ...edge,
        isCrossProject: sourceNode && targetNode && sourceNode.projectid !== targetNode.projectid
      }
    })

    return {
      "nodes": validNodes,
      "edges": enhancedEdges
    }
  }

  const forceCluster = () => {
    let nodes;
    let centers;
    let strength = 0.3;

    function force(alpha){
      nodes.forEach(node => {
        const center = centers.get(node.projectid);
        if(center){
          node.vx += (center.x - node.x) * strength * alpha;
          node.vy += (center.y - node.y) * strength * alpha;
        }
      })
    }
    force.initialize = function(_){
      nodes = _;
    }
    force.centers = function(_){
      return arguments.length ? (centers = _, force) : centers;
    }
    force.strength = function(_){
      return arguments.length ? (strength = _, force) : strength;
    }
    return force
  }

  const nodePositionsRef = useRef(new Map())
  const svgGroupRef = useRef(null);



  useEffect(() => {
    if(!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr("width", "100%")
        .attr("height", "100%")
                    // .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        

    const g = svg.append('g')
    svgGroupRef.current = g;

    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('start', () => {
          bringToFront("view", "map")
        })
        .on('zoom', (e) => {
          g.attr('transform', e.transform)
        })
    svg.call(zoom)

    // svg.on("click", () => bringToFront("view", "map"))
      
  }, [])

  useEffect(() => {
     if(!containerRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            if(entries[0]){
                const { width, height } = entries[0].contentRect;
                setDimensions({width, height})
            }
        })
        resizeObserver.observe(containerRef.current)

        return() => resizeObserver.disconnect()
  }, [])


  useEffect(() => {
    if(!svgGroupRef.current || !nodes.length || !edges.length) return;

    const g = svgGroupRef.current;
    const {width, height} = dimensions;

    let currentData, simulation;

    function dragstarted(event) {
      if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulationRef.current.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    if(viewMode == "overview"){
      currentData = getProjectLevelData(nodes, edges);

      currentData.nodes.forEach(node => {
        const phasePositions = [];
        nodePositionsRef.current.forEach((pos, id) => {
          if(id.startsWith(node.id + '_')){
            phasePositions.push(pos)
          }
        })
        if(phasePositions.length > 0){
          node.x = phasePositions.reduce((sum, p) => sum + p.x, 0) / phasePositions.length;
          node.y = phasePositions.reduce((sum, p) => sum + p.y, 0) / phasePositions.length;
        } else{
          const storedPos = nodePositionsRef.current.get(node.id);
          if(storedPos){
            node.x = storedPos.x;
            node.y = storedPos.y;
          }
        }
      })

      // overview drawing
      simulation = d3.forceSimulation(currentData.nodes)
        .force('link', d3.forceLink(currentData.edges)
          .id(d => d.id)
          .distance(250))
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(120));

      // missing cluster bg and cluster label
      g.selectAll('.link').attr('opacity', 0).remove();
      g.selectAll('.linkstroke').attr('opacity', 0).remove();
      g.selectAll('.node').attr('opacity', 0).remove();
      g.selectAll('.link-arrows').remove();
      g.selectAll('.title').remove();

      // const center = g.append('circle')
      //     .attr('cx', width/2)
      //     .attr('cy', height/2)
      //     .attr('r', 4)

        const links = g.append('g')
          .attr('class', 'links-group')
          .selectAll('path')
          .data(currentData.edges)
          .join('path')
            .attr('class', 'link')
            .attr('id', d => `overview-link-${d.source.id}-${d.target.id}`)
            .attr('stroke', '#000000')
            .attr('stroke-width', d => Math.sqrt(d.count) * 4 + 1)
            .attr('fill', 'none')
            .attr('stroke-dasharray', "6 3")

        const linkstrans = g.append('g')
          .attr('class', 'links-group-trans')
          .selectAll('path')
          .data(currentData.edges)
          .join('path')
            .attr('class', 'link')
            .attr('stroke', 'transparent')
            .attr('stroke-width', 10)
            .attr('fill', 'none')
            .style('cursor', 'pointer')


        linkstrans
          .on('click', (event, data) => {handleOpen("edgelist", `proj:${data.source.id}>${data.target.id}`, path)}) // !!----> ADD FUNCTION HERE FOR OPENING EDGELIST WITH DATA.EDGEDETAILS 
          .on("mouseenter", function(e,d){
            d3.select(`#overview-link-${d.source.id}-${d.target.id}`)
              .attr('stroke-width', d => Math.sqrt(d.count) * 4 + 3)
          })
          .on("mouseleave", function(e,d){
            d3.select(`#overview-link-${d.source.id}-${d.target.id}`)
              .attr('stroke-width', d => Math.sqrt(d.count) * 4 + 1)
          })

        const arrowGroup = g.append('g').attr("class", "link-arrows")

        const arrows = arrowGroup.selectAll('polygon')
            .data(currentData.edges)
            .join('path')
              .attr('d', 'M0,-8 L16,0 L0,8')
              .attr('fill', 'none')
              .attr('stroke', 'black')
              .attr('stroke-width', d => Math.sqrt(d.count) * 2 + 1)

        const nodeGroups = g.append('g')
          .attr('class', 'nodes-group')
          .selectAll('g')
          .data(currentData.nodes)
          .join('g')
            .attr('class', 'node')
            .style('cursor', 'pointer')
            .call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));

        // nodeGroups.append('circle')
        //   .attr('r', 10)
        //   .attr('fill', "#fff")
        //   .attr('stroke', 'black')
        //   .attr('stroke-width', 2)
        //   .on("mouseenter", function(e, d){
        //     d3.select(this)
        //       .attr('fill', "black")
        //   })
        //   .on("mouseleave", function(e, d){
        //     d3.select(this)
        //       .attr('fill', "#fff")
        //   })
        nodeGroups.append('rect')
          .attr("id", (d) => `project-node-${d.id}`)
          .attr("class", "hoveritemfill")
          .attr("width", 20)
          .attr("height", 20)
          .attr("x", -10)
          .attr("y", -10)
          .attr("fill", (d) => hoveredItem.kind == "project" && hoveredItem.id == d.id ? "var(--blueblue)" : "#fff")
        nodeGroups.append('svg:image')
          .attr("xlink:href", "./icons/icon_project.svg")
          .attr("width", 20)
          .attr("height", 20)
          .attr("x", -10)
          .attr("y", -10)
          .on("mouseenter", function(e, d){
            setHoveredItem({"kind": "project", "id": d.id, "from": "map"})
            d3.select(`#project-node-${d.id}`)
              .attr('fill', "#000")
          })
          .on("mouseleave", function(e, d){
            setHoveredItem({"kind": null, "id": null, "from": null})
            d3.select(`#project-node-${d.id}`)
              .attr('fill', "#fff")
          })

        let bbox = {}

        nodeGroups.append('rect')
          .attr('class', 'text-bg')
          // .datum(bbox)
          .attr('y', -10)
          .attr('x', 15)
          .attr('width', 20)
          .attr('height', 20)
          .attr('fill', 'white')

        nodeGroups.append('text')
          .attr('text-anchor', d => d.x < width / 2 ? 'end' : 'start')
          .attr('class', 'titles')
          // .datum(bbox)
          .attr('dy', 5)
          .attr('dx', d => d.x < width / 2 ? -15 : 15)
          .attr('font-size', '14px')
          .attr('font-weight', 'bold')
          .attr('fill', '#000')
          .text(d => `${projects.find((p) => p.id === d.id).title} (〇${d.phaseCount})`);

        nodeGroups.selectAll(".titles")
          .each(function(d){d.bbox = this.getBBox() })

        nodeGroups.selectAll(".text-bg")
          .attr("width", d => d.bbox.width)
          .attr('height', d => d.bbox.height)
          .attr('x', d => d.bbox.x)
          .attr("y", d => d.bbox.y)

          

        // nodeGroups.append('text')
        //   .attr('text-anchor', 'middle')
        //   .attr('dy', 15)
        //   .attr('font-size', '12px')
        //   .attr('fill', '#7f8c8d')
        //   .text(d => `${d.phaseCount} phases`);
      
        nodeGroups.on('click', (event, data) => {handleOpen(data.type, data.id, path)}) // FUNCTION TO OPEN THE PROJECTS FROM NODES
          // .on('mouseenter', function(e,d){openTooltip(e, 'title', d.desc)})
          // .on('mouseleave', function(e,d){openTooltip(e, 'close')})


        nodeGroups.append('title')
          .text(d => `${d.title}\n${d.year}\n${d.phaseCount} design phases`);

        linkstrans.append('title')
          .text(d => `${d.count} connection${d.count > 1 ? 's' : ''} from ${d.source.id || d.source} to ${d.target.id || d.target}`);

        // Update positions on tick
        simulation.on('tick', () => {
          links.attr('d', d => {
            const source = d.source;
            const target = d.target;
            const dx = target.x - source.x;
            const dy = target.y - source.y;

            const angle = Math.atan2(dy, dx)
            const offset = Math.sqrt(dx * dx + dy * dy) * 0.2
            const cx = (source.x + target.x) / 2 + Math.sin(angle) * offset
            const cy = (source.y + target.y) / 2 - Math.cos(angle) * offset

            return `M${source.x},${source.y} Q${cx},${cy} ${target.x},${target.y}`
          });
          linkstrans.attr('d', d => {
            const source = d.source;
            const target = d.target;
            const dx = target.x - source.x;
            const dy = target.y - source.y;

            const angle = Math.atan2(dy, dx)
            const offset = Math.sqrt(dx * dx + dy * dy) * 0.2
            const cx = (source.x + target.x) / 2 + Math.sin(angle) * offset
            const cy = (source.y + target.y) / 2 - Math.cos(angle) * offset

            return `M${source.x},${source.y} Q${cx},${cy} ${target.x},${target.y}`
          });
          arrows.attr('transform', d => {
            const source = d.source;
            const target = d.target;
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            
            const angle = Math.atan2(dy, dx);
            const offset = Math.sqrt(dx * dx + dy * dy) * 0.2;
            const cx = (source.x + target.x) / 2 + Math.sin(angle) * offset;
            const cy = (source.y + target.y) / 2 - Math.cos(angle) * offset;
            
            // Midpoint at t=0.5
            const t = 0.7;
            const mx = (1-t)*(1-t)*source.x + 2*(1-t)*t*cx + t*t*target.x;
            const my = (1-t)*(1-t)*source.y + 2*(1-t)*t*cy + t*t*target.y;
            
            // Tangent direction
            const tx = 2*(1-t)*(cx - source.x) + 2*t*(target.x - cx);
            const ty = 2*(1-t)*(cy - source.y) + 2*t*(target.y - cy);
            const tangentAngle = Math.atan2(ty, tx) * (180 / Math.PI);
            
            return `translate(${mx},${my}) rotate(${tangentAngle})`;
          });

          nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
          
          // Store positions
          currentData.nodes.forEach(node => {
            nodePositionsRef.current.set(node.id, { x: node.x, y: node.y });
          });
        });
    } else{
      currentData = getDetailLevelData(nodes, edges);
      
      // Calculate cluster centers for each project
      const projectGroups = d3.group(currentData.nodes, d => d.projectid);
      const clusterCenters = new Map();
      const projectIds = Array.from(projectGroups.keys());
      
      // Try to use stored project positions for cluster centers
      projectIds.forEach((projectId, index) => {
        const storedPos = nodePositionsRef.current.get(projectId);
        if (storedPos) {
          clusterCenters.set(projectId, storedPos);
        } else {
          // Fallback to circular layout
          const angle = (index / projectIds.length) * 2 * Math.PI;
          const radius = Math.min(width, height) * 0.3;
          clusterCenters.set(projectId, {
            x: width / 2 + radius * Math.cos(angle),
            y: height / 2 + radius * Math.sin(angle)
          });
        }
      });

      currentData.nodes.forEach(node => {
        const storedPos = nodePositionsRef.current.get(node.id);
        if (storedPos) {
          node.x = storedPos.x;
          node.y = storedPos.y;
        } else {
          // Initialize near cluster center
          const center = clusterCenters.get(node.projectid);
          if (center) {
            node.x = center.x + (Math.random() - 0.5) * 100;
            node.y = center.y + (Math.random() - 0.5) * 100;
          }
        }
      });

      // draw detailed map
      simulation = d3.forceSimulation(currentData.nodes)
        .force('link', d3.forceLink(currentData.edges)
          .id(d => d.id)
          .distance(d => d.isCrossProject ? 200 : 60))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('cluster', forceCluster()
          .centers(clusterCenters)
          .strength(0.5))
        .force('collision', d3.forceCollide().radius(12));

      g.selectAll('.link').attr('opacity', 0).remove();
      g.selectAll(".linkstroke").attr('opacity', 0).remove();
      g.selectAll('.node').attr('opacity', 0).remove();
      g.selectAll('.link-arrows').remove();
      g.selectAll('.title').remove();


      const links = g.append('g')
          .attr('class', 'links-group')
          .selectAll('line')
          .data(currentData.edges.filter((edge) => !edge.isCrossProject))
          .join('line')
            .attr('class', 'linkstroke')
            .attr('id', d => `map-detail-link-${d.source.id}-${d.target.id}`)
            .attr('stroke', '#000000')
            .attr('stroke-width', 1)
            .attr('opacity', 0.5)
            .style('cursor', 'pointer');

        const linkstrans = g.append('g')
          .attr('class', 'links-group')
          .selectAll('line')
          .data(currentData.edges.filter((edge) => !edge.isCrossProject))
          .join('line')
            .attr('class', 'link')
            .attr('stroke', 'transparent')
            .attr('stroke-width', 4)
            .style('cursor', 'pointer');

        linkstrans.on("click", (event, data) => {handleOpen("edge", `${data.source.id}-${data.target.id}`, path)}) // FUNCTION TO OPEN EDGE
            .on("mouseenter", function(e,d){
              setHoveredItem({"kind": "edge", "id": `${d.source.id}-${d.target.id}`, "from": "map"})
              d3.select(`#map-detail-link-${d.source.id}-${d.target.id}`)
                .attr('stroke-width', 3)
                .attr("stroke", "#000")
            })
            .on("mouseleave", function(e,d){
              setHoveredItem({"kind": null, "id": null, "from": null})
              d3.select(`#map-detail-link-${d.source.id}-${d.target.id}`)
                .attr('stroke-width', 1)
                .attr("stroke", "#000")
            })

        const externallinks = g.append('g')
          .attr('class', 'external-links-group')
          .selectAll('path')
          .data(currentData.edges.filter((edge) => edge.isCrossProject))
          .join('path')
            .attr('class', 'linkstroke')
            .attr('id', d => `map-detail-link-${d.source.id}-${d.target.id}`)
            .attr("fill", 'none')
            .attr('stroke', '#000000')
            .attr('stroke-width', 2)
            .attr('opacity', 1)
            .attr('stroke-dasharray', '5,5')
            .style('cursor', 'pointer');

        const externallinkstrans = g.append('g')
          .attr('class', 'external-links-group')
          .selectAll('path')
          .data(currentData.edges.filter((edge) => edge.isCrossProject))
          .join('path')
            .attr('class', 'link')
            .attr("fill", 'none')
            .attr('stroke', 'transparent')
            .attr('stroke-width', 5)
            .attr('opacity', 1)
            .style('cursor', 'pointer');

        externallinkstrans.on("click", (event, data) => {handleOpen("edge", `${data.source.id}-${data.target.id}`, path)}) // FUNCTION TO OPEN EDGE
            .on("mouseenter", function(e,d){
              setHoveredItem({"kind": "edge", "id": `${d.source.id}-${d.target.id}`, "from": "map"})
              d3.select(`#map-detail-link-${d.source.id}-${d.target.id}`)
                .attr('stroke-width', 4)
            })
            .on("mouseleave", function(e,d){
              setHoveredItem({"kind": null, "id": null, "from": null})
              d3.select(`#map-detail-link-${d.source.id}-${d.target.id}`)
                .attr('stroke-width', 2)
            })

        // Draw nodes
        const nodeGroups = g.append('g')
          .attr('class', 'nodes-group')
          .selectAll('g')
          .data(currentData.nodes)
          .join('g')
            .attr('class', 'node')
            .attr('opacity', 1)
            .style('cursor', 'pointer')
            .call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));

        nodeGroups.append('circle')
         .attr('r', 8)
          .attr("class", "hoveritemfill")
          .attr('fill', "#fff")
          .attr('stroke', '#000')
          .attr('stroke-width', 2)
          .on("mouseenter", function(e,d){
            setHoveredItem({"kind": "node", "id": d.id, "from": "map"})
              d3.select(this)
                .attr("fill", "black")
            })
          .on("mouseleave", function(e,d){
            setHoveredItem({"kind": null, "id": null, "from": null})
              d3.select(this)
                .attr("fill", "#fff")
            })

        const titleGroups = g.append('g')
            .attr('class', 'title')
            .selectAll('g')
            .data(projectIds)
            .join('g')
            .append('foreignObject')
            .attr('width', 200)
            .attr('height', 200)
            .style('pointer-events', 'none')
            .attr("x", d => 
                clusterCenters.get(d).x > width/2 ? clusterCenters.get(d).x + ((clusterCenters.get(d).x - width / 2) / 4) + 80
                                                  : clusterCenters.get(d).x - ((width/2 - clusterCenters.get(d).x) / 4) - 280
                // clusterCenters.get(d).x > width/2 ? clusterCenters.get(d).x + 100 : clusterCenters.get(d).x - 200
              )
            .attr('y', d => 
              clusterCenters.get(d).y > height/2 ? clusterCenters.get(d).y + (clusterCenters.get(d).y - height/2) / 3
                                                  : clusterCenters.get(d).y - (height/2 - clusterCenters.get(d).y) / 3
              
            )
            .append("xhtml:div")
            .style('font-size', "12px")
            .style('font-weight', 'bold')
            .style('text-align', d => clusterCenters.get(d).x > width/2 ? 'left' : 'right')
            .style('background-color', 'rgba(255,255,255,0.7)')
            .style('z-index', -1)
            .html(d => projects.find(p => p.id == d).title)
          

        // nodeGroups.append('text')
        //   .attr('dx', 12)
        //   .attr('dy', 4)
        //   .attr('font-size', '10px')
        //   .attr('fill', '#ffffff')
        //   .text(d => d.id);
        
        nodeGroups.on("click", (event, data) => {handleOpen("node", data.id, path)}) // FUNCTION TO HANDLE OPEN INDIVIDUAL NODES    

        const arrowGroup = g.append('g').attr("class", "link-arrows")

        const arrows = arrowGroup.selectAll('polygon')
            .data(currentData.edges.filter((edge) => edge.isCrossProject))
            .join('path')
              .attr('d', 'M0,-6 L12,0 L0,6')
              .attr('fill', 'none')
              .attr('stroke', 'black')
              .attr('stroke-width', 2)

        nodeGroups.append('title')
          .text(d => `${projects.find((p) => p.id == d.id.split("_")[0]).title}\nPhase: ${phase_labels[d.phase]}`);

        linkstrans.append('title')
          .text(d => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return d.isCrossProject 
              ? `${sourceId.replace("_", " ")} → ${targetId.replace("_", " ")}`
              : `${sourceId.replace("_", " ")} → ${targetId.replace("_", " ")}`;
          });

        externallinkstrans.append('title')
          .text(d => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return d.isCrossProject 
              ? `${sourceId.replace("_", " ")} → ${targetId.replace("_", " ")}`
              : `${sourceId.replace("_", " ")} → ${targetId.replace("_", " ")}`;
          });

        simulation.on('tick', () => {
          links
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          linkstrans
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          externallinks.attr('d', d => {
            const source = d.source;
            const target = d.target;
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            // const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
            // const dist = Math.sqrt(dx * dx + dy * dy)

            // const angle = Math.atan2(dy, dx)
            // const offset = dist * 0.2
            // const mx = (source.x + target.x) / 2 + Math.sin(angle) * offset
            // const my = (source.y + target.y) / 2 - Math.cos(angle) * offset

            // return `M${source.x},${source.y} L${mx},${my} L${target.x},${target.y}`

            const angle = Math.atan2(dy, dx)
            const offset = Math.sqrt(dx * dx + dy * dy) * 0.1
            const cx = (source.x + target.x) / 2 + Math.sin(angle) * offset
            const cy = (source.y + target.y) / 2 - Math.cos(angle) * offset

            return `M${source.x},${source.y} Q${cx},${cy} ${target.x},${target.y}`
            
            // return `M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
          });

          externallinkstrans.attr('d', d => {
            const source = d.source;
            const target = d.target;
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            // const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
            // const dist = Math.sqrt(dx * dx + dy * dy)

            // const angle = Math.atan2(dy, dx)
            // const offset = dist * 0.2
            // const mx = (source.x + target.x) / 2 + Math.sin(angle) * offset
            // const my = (source.y + target.y) / 2 - Math.cos(angle) * offset

            // return `M${source.x},${source.y} L${mx},${my} L${target.x},${target.y}`

            const angle = Math.atan2(dy, dx)
            const offset = Math.sqrt(dx * dx + dy * dy) * 0.1
            const cx = (source.x + target.x) / 2 + Math.sin(angle) * offset
            const cy = (source.y + target.y) / 2 - Math.cos(angle) * offset

            return `M${source.x},${source.y} Q${cx},${cy} ${target.x},${target.y}`
            
            // return `M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
          });

          arrows.attr('transform', d => {
            const source = d.source;
            const target = d.target;
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            
            const angle = Math.atan2(dy, dx);
            const offset = Math.sqrt(dx * dx + dy * dy) * 0.1;
            const cx = (source.x + target.x) / 2 + Math.sin(angle) * offset;
            const cy = (source.y + target.y) / 2 - Math.cos(angle) * offset;
            
            // Midpoint at t=0.5
            const t = 0.7;
            const mx = (1-t)*(1-t)*source.x + 2*(1-t)*t*cx + t*t*target.x;
            const my = (1-t)*(1-t)*source.y + 2*(1-t)*t*cy + t*t*target.y;
            
            // Tangent direction
            const tx = 2*(1-t)*(cx - source.x) + 2*t*(target.x - cx);
            const ty = 2*(1-t)*(cy - source.y) + 2*t*(target.y - cy);
            const tangentAngle = Math.atan2(ty, tx) * (180 / Math.PI);
            
            return `translate(${mx},${my}) rotate(${tangentAngle})`;
          });

          nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
          
          // Store positions
          currentData.nodes.forEach(node => {
            nodePositionsRef.current.set(node.id, { x: node.x, y: node.y });
          });
        });
    }

    simulationRef.current = simulation;

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [viewMode, nodes, edges, projects, dimensions, open])

  useEffect(() => {
    if(!svgGroupRef.current || !nodes.length || !edges.length) return;

    const g = svgGroupRef.current;

    if(viewMode == "overview"){
      g.selectAll(".hoveritemfill")
        .attr("fill", (d) => hoveredItem.kind == "project" && hoveredItem.id == d.id && hoveredItem.from != "map" ? "var(--blueblue)" : hoveredItem.kind == "project" && hoveredItem.id == d.id && hoveredItem.from == "map" ? "#000" : "#fff")
    } else{
      g.selectAll(".hoveritemfill")
        .attr("fill", (d) => hoveredItem.kind == "node" && hoveredItem.id == d.id && hoveredItem.from != "map" ? "var(--blueblue)" : hoveredItem.kind == "node" && hoveredItem.id == d.id && hoveredItem.from == "map" ? "#000" : "#fff")

      g.selectAll(".linkstroke")
        .attr("stroke", (d) => hoveredItem.kind == "edge" && hoveredItem.id == `${d.source.id}-${d.target.id}` && hoveredItem.from != "map" ? "var(--blueblue)" : "#000")
    }
    
  }, [hoveredItem])


  return (
    <>

      <div ref={containerRef} style={{width: "100%", height: "96%"}} >
        <div id="mapview-buttons">
          <div className="button" style={{backgroundColor: viewMode == "overview" ? "var(--blueblue)" : "var(--lightblue)", color: viewMode == "overview" ? "white" : "black"}} onClick={() => setViewMode("overview")}>Overview of projects</div>
          <div className="button" style={{backgroundColor: viewMode == "detail" ? "var(--blueblue)" : "var(--lightblue)", color: viewMode == "detail" ? "white" : "black"}} onClick={() => setViewMode("detail")}>Individual design phases</div>
          <div className="info-button" onMouseEnter={(e) => openTooltip(e, "mapinfo")} onMouseLeave={(e) => openTooltip(e, 'close')}>i</div>
        </div>
        <div className='smalltext' style={{position: 'absolute', top: '43px', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: '95%', backgroundColor: 'rgba(255,255,255,1)'}}>
          {viewMode == "overview" ? 'A network showing the overall connections between different projects.' : 'A network showing all the design phases within each project and how they connect.'}
        </div>
        <svg onMouseDown={() => bringToFront("view", "map")}
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab'
        }}
      />
      {/* <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '10px',
        background: 'rgba(255,255,255,0.95)',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontSize: '12px',
        maxWidth: '200px'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '2px' }}>Legend</div>
        <div>
          <span style={{ fontWeight: '500' }}>Overview:</span> Projects as nodes
        </div>
        <div>
          <span style={{ fontWeight: '500' }}>Detail:</span> All phases visible
        </div>
        <div style={{ marginTop: '5px', paddingTop: '5px', borderTop: '1px solid #ddd' }}>
          <div style={{ fontSize: '11px', color: '#666' }}>
            • Click nodes/edges to open<br/>
            • Drag to reposition<br/>
            • Scroll to zoom<br/>
            • Solid lines: internal<br/>
            • Dashed lines: cross-project
          </div>
        </div>
      </div> */}
      <div className="view-switch-btns">
          <div onClick={() => handleOpen("view", "list", path)} className="white-button">Open List</div>
          <div onClick={() => handleOpen("view", "matrix", path)} className="white-button">Open Matrix</div>
        </div>
      </div>
      </>
  )
}

export default MapView