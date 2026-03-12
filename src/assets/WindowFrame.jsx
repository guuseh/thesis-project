import {useState, useEffect, useRef} from 'react'
import {Rnd} from 'react-rnd'

const WindowFrame = ({children, zMap, bringToFront, handleOpen, handleClose, handleMinim, saveFramePos, kind, id, path, position, size, hoveredItem, setHoveredItem}) => {

    const rndRef = useRef();

  // ! maybe add some randomisation to position so theyre not perfectly stacked
    const [pos, setPos] = useState(position !== undefined && position.length == 2 && position[0] !== undefined ? [position[0], position[1]] 
                                    : kind == "view" ?    [Math.floor(Math.random()*20)-20,                         30] 
                                    : kind == "project" ? [window.innerWidth*0.44+Math.floor(Math.random()*20)-20,  30] 
                                    : kind == "edgelist" ?[Math.floor(Math.random()*20)-20,                         window.innerHeight*0.57+Math.floor(Math.random()*20)-20] 
                                    : kind == "node" ?    [window.innerWidth*0.35+Math.floor(Math.random()*10)-20,  window.innerHeight*0.64+Math.floor(Math.random()*20)] 
                                    :                     [window.innerWidth*0.62+Math.floor(Math.random()*10)-20,  window.innerHeight*0.64+Math.floor(Math.random()*20)])
  const [sizes, setSizes] = useState(size !== undefined && size.length == 2 && size[0] != undefined ? [size[0], size[1]] 
                                    : (kind == "view" && id == "list") ?    [window.innerWidth*0.43,  window.innerHeight*0.6]
                                    : (kind == "view" && id == "map") ?    [window.innerWidth*0.43,  window.innerHeight*0.5]
                                    : (kind == "view" && id == "matrix") ?    [window.innerHeight*0.6,  window.innerHeight*0.6]
                                    : kind == "project" ? [window.innerWidth*0.54,  window.innerHeight*0.6]
                                    : kind == "edgelist" ?[window.innerWidth*0.4,   window.innerHeight*0.36] 
                                    : kind == "node" ?    [window.innerWidth*0.25,  window.innerHeight*0.27]
                                    :                     [window.innerWidth*0.36,  window.innerHeight*0.27])

  useEffect(() => {
    saveFramePos(kind, id, pos[0], pos[1], sizes[0], sizes[1])
  }, [pos, sizes])



  return (
    <Rnd 
        // default={{x: pos[0], y: pos[1], width: sizes[0], height: sizes[1]}} 
      ref={rndRef}
      bounds="window"
      style={{ zIndex: zMap[`${kind}_${id}`] ?? 100, 
                boxShadow: hoveredItem.kind == kind && hoveredItem.id == id && (hoveredItem.from !== "window" && hoveredItem.from !== `edge-${id}` && hoveredItem.from !== `node-${id}`) ? "2px 10px 15px rgba(14, 14, 114, 0.53)" : null,
                // outline: hoveredItem.kind == kind && hoveredItem.id == id && hoveredItem.from !== "window" && hoveredItem.from !== `edge-${id}` && hoveredItem.from !== `node-${id}` ? "2px solid var(--blueblue)" : null,
                background: hoveredItem.kind == kind && hoveredItem.id == id && hoveredItem.from !== "window" && hoveredItem.from !== `edge-${id}` && hoveredItem.from !== `node-${id}` ? "var(--lightishblue)" : "rgba(255,255,255,0.97)"
                }}
      position={{x: pos[0], y: pos[1]}}
      size={{width: sizes[0], height: sizes[1]}}
      minWidth={150}
      minHeight={150}
      className={kind == "func" ? "frame-func" : "frame-rnd"} 
      id={`${kind}_${id}`}
      dragHandleClassName="handler"
      onMouseEnter={() => setHoveredItem({"kind": kind, "id": id, "from": "window"})}
      onMouseLeave={() => setHoveredItem({"kind": null, "id": null, "from": null})}
      onDragStart={() => bringToFront(kind, id)}
      onDragStop={(e,d) => {setPos([d.x, d.y])}}
      onMouseDown={() => {bringToFront(kind, id)}}
      onResizeStart={() => bringToFront(kind, id)}
      onResizeStop={(e,d,ref, delta, position) => {setSizes([ref.style.width.slice(0, -2), ref.style.height.slice(0, -2)]); setPos([position.x, position.y])}}>
        <div className="handler">
            <div>
              <div className="handler-path">{path.map((i, index) => {
                // console.log(i)
                let navText;
                let imgpath
                if(i.kind == "view"){
                  imgpath = i.id
                } else{
                  imgpath = i.kind
                }
                if(i.kind === "node"){
                  navText = i.id.replace("_", " ")
                } else if(i.kind === "edge"){
                  navText = i.id.replace("-", " – ").replaceAll("_", " ")
                } else if(i.kind === "edgelist"){
                  navText = i.id.split(":").splice(1).join(":").replace(":", ": ").replace(">", " > ")
                } else{
                  navText = i.id
                }
              return <>{index > 0 && <span>&#8594; </span>}
                    {i.kind !== "func" && <img src={`/icons/icon_${imgpath}.svg`} style={{filter: "invert(1)", marginRight: "2px"}} height="9px"/>}
                    <span className="handler-path-link" onClick={() => handleOpen(i.kind, i.id, i.path)}>{navText}</span>  </>
                        })}</div>
            </div>
            <div className="handler-btns">
              {kind !== "func" && 
              <div onClick={() => handleMinim(kind, id, pos[0], pos[1], sizes[0], sizes[1])}>
                <svg width="100%" height="100%" >
                  <line x1="0%" x2="100%" y1="50%" y2="50%" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              }
              <div onClick={() => handleClose(kind, id)}>
                <svg width="100%" height="100%" >
                  <line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                  <line x1="100%" x2="0%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
        </div>
        <div className="frame-content">

                {children}

        </div>
    </Rnd>
  )
}

export default WindowFrame