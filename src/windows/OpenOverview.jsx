import {useCallback, useState} from 'react'

const OpenOverview = ({open, setOpen, handleOpen, handleClose, handleCloseAll, id, path, hoveredItem, setHoveredItem, canReopen, setCanReopen}) => {

    const visibleOpen = open.filter((o) => {return o.kind !== "func"})

    const [openStack, setOpenStack] = useState([])

    const saveOpenSnapshot = useCallback(() => {
        setOpenStack(prev => [...prev, {
            open: [...open]
        }])
    }, [open])

    const undoCloseAll = useCallback(() => {
        if(openStack.length === 0) return;

        const lastSnapshot = openStack[openStack.length -1]

        setOpen(lastSnapshot.open)
        setOpenStack(prev => prev.slice(0, -1))
        setCanReopen(false)
    })

    const closeAll = () => {
        saveOpenSnapshot()
        handleCloseAll(visibleOpen)
        setCanReopen(true)
    }

  return (
    <div>
        {/* {open.filter((o) => {
            return o.kind !== "func"
        }) */}
        <>
        {canReopen ? <div id="open-overview-closeall" className="button" style={{background: "red", color: 'black'}} onClick={() => undoCloseAll()}>Undo</div>
            : visibleOpen.length ? <div id="open-overview-closeall" className="button" onClick={() => closeAll()}>Close all</div> : <></>}
        {visibleOpen.length ?   
            <> 
            <div className="smalltext" style={{position: "fixed", bottom: "10px", left: "50%", transform: "translateX(-50%)", width: "max-content", opacity: 0.3, zIndex: 2000}}>Resize windows to see something fun :)</div>
            <div id="open-overview-content">
            {visibleOpen.sort((x,y) => (x.minim === y.minim) ? 0 : x.minim ? 1 : -1).map((o) => {
                const isHighlighted = hoveredItem.kind == o.kind && hoveredItem.id == o.id && hoveredItem.from !== "open-overview"
                const fill = isHighlighted ? "var(--blueblue)" : o.minim ? "white" : "var(--mediumblue)"
                const color = isHighlighted ? "var(--lightblue)" : "#000"
                const iconpath = o.kind === "view" ? `icon_${o.id}` 
                                : `icon_${o.kind}`
                const text = o.kind === "view" ? o.id 
                            : o.kind === "project" ? o.id
                            : o.kind === "edgelist" ? o.id.split(":").slice(1).join(':').replace(':', ":\n").replaceAll('>', " > ")
                            : o.kind === 'node' ? o.id.replace("_", " ")
                            : o.kind === 'edge' ? o.id.replaceAll("_", " ").replace("-", "\n")
                            : o.kind

                if(!o.minim){
                return <div className="open-overview-item" style={{width: o.w ? o.w/5 : "auto", height: o.h ? o.h/5 : "auto"}}>
                    <div onClick={() => {handleOpen(o.kind, o.id, o.path)}}
                        onMouseEnter={() => setHoveredItem({"kind": o.kind, "id": o.id, "from": "open-overview"})}
                        onMouseLeave={() => setHoveredItem({"kind": null, "id": null, "from": null})}
                        style={{backgroundColor: fill, color: color}}>
                            <img src={`./icons/${iconpath}.svg`} height="40%" style={{filter: isHighlighted ? "invert(1)" : null}}/>
                            <div style={{minWidth: "min-content"}}>{text}</div></div>
                    <div className="open-overview-closebtn" onClick={() => {handleClose(o.kind, o.id)}}>
                        <svg width="100%" height="100%" >
                        <line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                        <line x1="100%" x2="0%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                        </svg>
                    </div>
                </div>
                } else{
                    return <div className="open-overview-item-minim" style={{width: "120px", height: "30px"}}>
                        <div onClick={() => {handleOpen(o.kind, o.id, o.path)}}
                        onMouseEnter={() => setHoveredItem({"kind": o.kind, "id": o.id, "from": "open-overview"})}
                        onMouseLeave={() => setHoveredItem({"kind": null, "id": null, "from": null})}
                        style={{backgroundColor: fill, color: color, flexDirection: "row"}}>
                            <img src={`./icons/${iconpath}.svg`} height="50%" style={{filter: isHighlighted ? "invert(1)" : null}}/>
                            <div style={{minWidth: "min-content"}}>{text}</div></div>
                        <div className="open-overview-closebtn" onClick={() => {handleClose(o.kind, o.id)}}>
                            <svg width="100%" height="100%" >
                            <line x1="0%" x2="100%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                            <line x1="100%" x2="0%" y1="0%" y2="100%" stroke="white" strokeWidth="2"/>
                            </svg>
                        </div>
                    </div>
                }
            }) }
            </div>
            </>
        :
        <div style={{opacity: 0.3, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-200%)"}} className="smalltext">No open frames</div>
    }
    </>
    </div>
  )
}

export default OpenOverview