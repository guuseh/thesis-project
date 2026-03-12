import React from 'react'

const Tooltip = ({children, x, y, setTooltip, size}) => {
  return (
    <>
    <div className="info-tooltip"
        style={{left: window.innerWidth-x+30 < 300 ? x - (300 - ((window.innerWidth) - x)) : x+10, top: y+10, width: `minmax(fit-content, ${window.innerWidth-x+30})`, maxWidth: 300, padding: size == "s" ? '2px' : '10px', fontSize: size == 's' ? 12 : 15}}>
        {children}
    </div>
    </>
  )
}

export default Tooltip