import {useState} from 'react'

const Help = () => {

  const [info, setInfo] = useState('platform') // platform, finngen, phases, windows, about

  return (
    <div style={{padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      
      <div style={{display: 'flex', gap: 10, position: 'sticky', top: 20, width: 'max-content', maxWidth: "95%"}}>
        <div style={{backgroundColor: info == "platform" ? "var(--blueblue)" : "var(--lightblue)", color: info == "platform" ? "white" : "black"}} onClick={() => setInfo("platform")} className="button">The platform</div>
        {/* <div style={{backgroundColor: info == "finngen" ? "var(--blueblue)" : "var(--lightblue)", color: info == "finngen" ? "white" : "black"}} onClick={() => setInfo("finngen")} className="button">VCD & FinnGen</div> */}
        <div style={{backgroundColor: info == "phases" ? "var(--blueblue)" : "var(--lightblue)", color: info == "phases" ? "white" : "black"}} onClick={() => setInfo("phases")} className="button">Different design phases</div>
        <div style={{backgroundColor: info == "windows" ? "var(--blueblue)" : "var(--lightblue)", color: info == "windows" ? "white" : "black"}} onClick={() => setInfo("windows")} className="button">Windows, views & navigation</div>
        {/* <div style={{backgroundColor: info == "about" ? "var(--blueblue)" : "var(--lightblue)", color: info == "about" ? "white" : "black"}} onClick={() => setInfo("about")} className="button">About</div> */}
      </div>

      {
        info === 'platform' ? 
        <div className="info-textcontainer">
          <div>Design research rarely happens in isolation. Projects build on each other, methodologies transfer between contexts, and insights from one investigation shape questions in the next. Yet this interconnectedness is often invisible—documented only in scattered references, informal conversations, or the institutional memory of a research team.</div>
          <div>This platform makes those connections explicit and explorable.</div>
          <div>Rather than presenting projects as discrete achievements with clear start and end dates, we document them as nodes in an evolving network of ideas, methods, and knowledge. Each project progresses through defined design phases, but the platform reveals something more valuable: the moments when one project's learning becomes another's starting point.</div>
          <div>By making these connections visible and navigable, the platform serves dual purposes. For researchers within the team, it becomes a tool for reflection and strategic planning—understanding which parts of the process most frequently generate transferable knowledge, or identifying opportunities for cross-project collaboration. For external visitors, it offers transparency into how design research actually unfolds: not as isolated projects, but as a cumulative body of interconnected investigations.</div>
          <div>The platform uses multiple complementary views because different questions require different perspectives. The Map reveals network structure and clustering patterns. The Matrix exposes frequency and density of connections. The List provides chronological context. Project timelines show internal progression. Together, they let you zoom between scales—from the entire research landscape down to individual phase-to-phase connections—following questions wherever they lead.</div>
          <div>This isn't meant to be consumed linearly. Navigate according to what interests you: follow a single project's evolution, trace how one design phase influences others across the entire body of work, or explore the thickest connections to see where cross-pollination happens most.</div>
        </div>
        : info === 'finngen' ?
        <div className="info-textcontainer">vcd & finngen</div>
        : info === 'phases' ?
        <div className="info-textcontainer">
          <div>Every project in our research group follows an unstructured progression through seven kinds of design phases. These aren't rigid sequential stages—projects often revisit earlier phases or work on multiple phases simultaneously—but they provide a consistent framework for documenting where insights emerge and how work progresses.</div>
          <div>The seven different phases are as follows:
            <div className="info-bulletpoint"><b>Phenomenon</b> (PH): The steps that fall under this phase description have to do with deciding on the scope of the research tool. What is the phenomenon that the researchers want to better understand with this tool?</div>
            <div className="info-bulletpoint"><b>Dimensions</b> (DI): These phases are about collecting and organising that data that is needed to make the tool work. From the enormous database of information that FinnGen has collected, we make a selection of the necessary data for this particular tool.</div>
            <div className="info-bulletpoint"><b>Use Cases</b> (UC): Here we figure out who will be using the tool and what needs it should provide for.</div>
            <div className="info-bulletpoint"><b>Functionalities</b> (FU): These determine the concrete tasks that the tool can execute.</div>
            <div className="info-bulletpoint"><b>Visualisation</b> (VI): The visualisation steps shape how the data will be translated to an understandable visual graph. Based on data visualisation techniques, the best visualisation type is picked to explain the particular data embedded in the tool.</div>
            <div className="info-bulletpoint"><b>Development</b> (DE): These moments are about the actual development of the tool, usually programmed as a website, implementing the functionalities and visualisations.</div>
            <div className="info-bulletpoint"><b>Testing</b> (TE): During testing, we invite potential users to give us feedback on the current state of the tool, which will inform our next steps in the process.</div>
          </div>
          <div>Exploring this platform, you will notice that these different phases appear many times throughout a single project. The design process we follow is fast and iterative, and one decision may influence the progression of other phases, meaning they have to be revisited from their previous state. Like this, the design is constantly renewed as we gather new insights over the course of many steps.</div>
        </div>
        : info === 'windows' ?
        <div className="info-textcontainer">
          <div>This platform lets you explore our design research in multiple ways. Windows can be opened, moved, minimized, and stacked as you navigate. Click the permanent buttons at the bottom right to access Legend, History, Open Frames and Info at any time.</div>

          <div>Hovering over windows or elements within windows highlights the corresponding element in other open windows. This helps you locate the different elements within the network as a whole.</div>

          <h3>Main Views</h3>
          <div><img src="/icons/icon_list.svg" height="12"/><b> List View</b> – A chronological list of all projects with descriptions and metadata. Click any project title to open its detailed timeline. Use this when you want a structured overview or know which project you're looking for.</div>
          
          <div>
            <img src="/icons/icon_map.svg" height="12"/> 
            <b> Map View</b> – A network visualization showing relationships across projects and design phases.
              <div className="info-bulletpoint">Overview mode: Projects appear as nodes, with edges showing cross-project connections. Edge thickness indicates the number of connections.</div>
              <div className="info-bulletpoint">Detail mode: Individual phases within each project become visible, grouped by project. Internal connections (solid lines) and cross-project connections (dashed lines) are both shown.</div>
              <div className="info-bulletpoint">Drag nodes to reposition them, drag the background to reposition the map, scroll to zoom, click nodes or edges to open details.</div>
          </div>

          <div>
            <img src="/icons/icon_matrix.svg" height="12"/>
            <b> Matrix View</b> – A grid showing connection density between projects or phases.
              <div className="info-bulletpoint">Project Matrix: Rows and columns are projects. Cell color intensity shows how many connections exist from one project (row) to another (column). Only cross-project connections are counted.</div>
              <div className="info-bulletpoint">Phase Matrix: Rows and columns are design phases across all projects. Shows how frequently each phase leads to another across our entire body of work. Toggle to show all connections, or only count internal or cross-project connections.</div>
              <div className="info-bulletpoint">Click any cell to open a filtered list of those specific connections.</div>
          </div>
          <br/>

          <h3>Detail Views</h3>
          <div>
            <img src="/icons/icon_project.svg" height="12"/>
            <b> Project Window</b> – Shows a single project's information and timeline with kinds of phases arranged in rows and process stages in columns.
              <div className="info-bulletpoint">Toggle timeline mode to see how long each phase lasted</div>
              <div className="info-bulletpoint">Show matrix to see how phases connect to each other within this project</div>
              <div className="info-bulletpoint">Hover over matrix cells to highlight matching connections in the timeline</div>
              <div className="info-bulletpoint">Dashed lines extending to the top indicate connections to phases in other projects</div>
          </div>

          <div><img src="/icons/icon_edgelist.svg" height="12"/><b> Edge List</b> – A filtered list of connections matching specific criteria (e.g., all connections from one project to another, or all instances where one phase led to another). Generated when you click on grouped network edges or matrix cells.</div>
          
          <div><img src="/icons/icon_node.svg" height="12"/><b> Node Window</b> – Process details about a single design phase, and which other phases feed into it (incoming) and which it leads to (outgoing). Dashed connections indicate links to phases in different projects.</div>
          
          <div><img src="/icons/icon_edge.svg" height="12"/><b> Edge Window</b> – Details about a connection between two phases, showing the source and target phases and their projects.</div>
          <br/>

          <h3>Functional Windows</h3>
          <div><b>Legend</b> – Shows visual symbols and their meanings. The legend adapts to highlight elements relevant to whichever window is currently on top, making it easier to understand what you're looking at.</div>
          
          <div>
            <b>History</b> – A tree visualization of your browsing path through the platform. This is saved only for the current browsing session.
              <div className="info-bulletpoint">Click any node to reopen that window</div>
              <div className="info-bulletpoint">Click a connection to delete it and all subsequent paths (useful for cleaning up exploratory detours)</div>
              <div className="info-bulletpoint">Clear entire history if you want to start fresh</div>
              <div className="info-bulletpoint">Undo clear operations if you change your mind</div>
          </div>

          <div><b>Open Frames</b> – Shows thumbnails of all currently open windows. Click to bring one to the front, close one, or close all at once to declutter your workspace.</div>
          <br/>

          <h3>Navigation Tips</h3>
          
          <div>Solid lines = connections within the same project</div>
          <div>Dashed lines = connections between different projects</div>
          <div>Windows automatically stack with the most recently clicked on top</div>
          <div>Minimize windows to the bottom bar to keep them accessible without cluttering your view</div>
          <div>Click and drag window title bars to reposition them</div>
          <div>The History window helps you understand how you got somewhere, especially useful after exploring many connections</div>

        </div>
        : info === 'about' ?
        <div className="info-textcontainer">about</div>
        :
        <div className="info-textcontainer">how did u get here</div>
      }
    </div>
  )
}

export default Help