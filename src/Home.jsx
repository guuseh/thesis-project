import {useState, useEffect} from "react"

import Map from "./windows/Map.jsx"
import List from "./windows/List.jsx"

const Home = () => {

    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)

    const [open, setOpen] = useState({})

    useEffect(() => {
        // split minim parameters by _ 
        const minimParams = params.getAll("minim")
        const minim = []
        minimParams.forEach((p) => {
            const split = p.split("_")
            minim.push({"kind": split[0], "id": split[1]})
        })

        // func here for checking if there's double parameters & open/minim overlap & weed out from url & setOpen

        setOpen({
            "view": params.getAll("view"),
            "project": params.getAll("project"),
            "node": params.getAll("node"),
            "minim": minim
        })

        const initialState = {
            "view": params.getAll("view"),
            "project": params.getAll("project"),
            "node": params.getAll("node"),
            "minim": minim
        }
        history.replaceState(initialState, "", document.location.href)
    }, [])

    const handleOpen = (kind, id) => {
        // if it's already open, don't open
        if(open[kind].includes(id)){
            return;
        }
        // check if it's minimised, maximise instead of open
        if(open.minim.some( e => e.id == id)){
            handleMaxim(kind, id)
            return;
        }
        const newState = {...open, [kind]: [...open[kind], id]}
        setOpen((prev) => ({...prev, [kind]: [...prev[kind], id]}))
        history.pushState(newState, "", `${paramsString}&${kind}=${id}`)
    }

    const handleClose = (kind, id) => {
        const tempArray = [...open[kind]]
        const removeThis = tempArray.indexOf(id)
        if(removeThis > -1){
            tempArray.splice(removeThis, 1)
        }
        const newState = {...open, [kind]: tempArray}
        setOpen((prev) => ({...prev, [kind]: tempArray}))
        const newParams = paramsString.includes(`&${kind}=${id}`) ? paramsString.replace(`&${kind}=${id}`, "") : paramsString.includes(`${kind}=${id}`) ? paramsString.replace(`${kind}=${id}`, "") : paramsString
        history.pushState(newState, "", newParams)
    }

    const handleMinim = (kind, id, x, y) => {
        const tempArray = [...open[kind]]
        const removeThis = tempArray.indexOf(id)
        if(removeThis > -1){
            tempArray.splice(removeThis, 1)
        }
        const newState = {...open, [kind]: tempArray, "minim": [...open.minim, {"kind": kind, "id": id, "x": x, "y": y}]}
        setOpen((prev) => ({...prev, [kind]: tempArray, "minim": [...prev.minim, {"kind": kind, "id": id, "x": x, "y": y}]}))
        const newParams = paramsString.includes(`&${kind}=${id}`) ? paramsString.replace(`&${kind}=${id}`, "") : paramsString.includes(`${kind}=${id}`) ? paramsString.replace(`${kind}=${id}`, "") : paramsString
        history.pushState(newState, "", newParams + "&minim=" + kind + "_" + id)
    }

    const handleMaxim = (kind, id) => {
        const tempArray = [...open.minim]
        const removeThis = tempArray.findIndex((e) => e.kind == kind && e.id == id)
        
        if(removeThis > -1){
            tempArray.splice(removeThis, 1)
        }
        const newState = {...open, [kind]: [...open[kind], id], "minim": tempArray}
        setOpen((prev) => ({...prev, [kind]: [...prev[kind], id], "minim": tempArray}))

        const newParams = paramsString.includes(`&minim=${kind}_${id}`) ? paramsString.replace(`&minim=${kind}_${id}`, "") : paramsString.includes(`minim=${kind}_${id}`) ? paramsString.replace(`minim=${kind}_${id}`, "") : paramsString
        history.pushState(newState, "", newParams + "&" + kind + "=" + id)
    }

    console.log(open)

    window.addEventListener("popstate", (event) => {
        if (event.state) {setOpen(event.state)}
        });

  return (
    <>
    <div>home</div>
    <div onClick={() => {handleOpen('view','map')}}>open map</div>
    <div onClick={() => {handleOpen('view','matrix')}}>open matrix</div>
    <div onClick={() => {handleOpen('view','list')}}>open list</div>

    <br/><br/><br/>

    {open.view?.map((v) => {
        // return <div>[ {v} view ] <span onClick={() => handleClose('view', v)}>x</span></div>
        return v == "map" ? <Map handleClose={handleClose} handleMinim={handleMinim}/> : v == "list" ? <List handleClose={handleClose} handleMinim={handleMinim}/> : <div>[ {v} view ] <span onClick={() => handleClose('view', v)}>x</span></div>
    })}
    <br/>
    {open.project?.map((p) => {
        console.log(p.length)
        return p.length > 0 &&  <div>[ project =&gt; <span onClick={() => {handleOpen('node','789')}}>node</span> ]</div>
    })}
    <br/>
    {open.node?.map((n) => {
        return n.length > 0 && <div>node: {n} <span onClick={() => handleMinim('node', n)}>-</span> <span onClick={() => handleClose('node', n)}>x</span></div>
    })}

    <br/><br/>
    {open.minim?.map((m) => {
        return m.kind != '' && m.kind != undefined && <div>- minimised {m.kind}: {m.id} =&gt; <span onClick={() => handleMaxim(m.kind, m.id)}>open</span></div>
    })}

    </>
  )
}

export default Home