import React from 'react'
import projects from "../data/projects.js"

const List = ({handleOpen, path, hoveredItem, setHoveredItem}) => {

  return (
      <div className="content-container" style={{marginBottom: 60}}>
        <div style={{padding: "20px 20px 0 20px"}}>
            <h1>Projects</h1>
            <br/>
            <div style={{marginBottom: "20px"}} className="smalltext">Browse all projects chronologically. Click a title to view project details.<br/>
                Switch to Map or Matrix view for visual exploration.</div>
        </div>
        <div>
            {projects.sort((a,b) => {
                return b.year.slice(-4) - a.year.slice(-4)
            }).map((p) => {
                return <div className="listview-projectdiv" style={{backgroundColor: hoveredItem.kind == "project" && hoveredItem.id == p.id && hoveredItem.from !== "list" ? "var(--lightblue)" : null}}>
                    <div onClick={() => handleOpen("project", p.id, path)} className="hover-line clickable"
                        onMouseEnter={() => setHoveredItem({"kind": "project", "id": p.id, "from": "list"})}
                        onMouseLeave={() => setHoveredItem({"kind": null, "id": null, "from": null})}>
                        <h3>{p.title}</h3>
                        <div className="no-hover-line">{p.year}</div>
                    </div>
                    <div>
                        <p>{p.short_desc}</p>
                    </div>
                    <div style={{opacity: 0.4}}>
                        <p>{p.cont}</p>
                    </div>
                </div>
            })}
        </div>

        <div className="view-switch-btns">
            <div onClick={() => handleOpen("view", "map", path)} className="button">open Map</div>
            <div onClick={() => handleOpen("view", "matrix", path)} className="button">open Matrix</div>
        </div>
      </div>
  )
}

export default List