import React, { useEffect } from "react"

export default function Toast ({ id, text, isNew, updateToastIconState }) {



  useEffect(() =>{
    if( !isNew ) return
    
    // console.log('toast: ', id);
    
    const timer = setTimeout(() => {
      updateToastIconState(id)
    } , 4000)
    return () => clearTimeout(timer)
  },[])

  return (
    <div key={id}>
      <span>{text}</span>

      <svg key={id} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <mask id={"mask-"+id}><g fill="none" stroke="#fff" strokeDasharray="24" strokeDashoffset="24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M2 13.5l4 4l10.75 -10.75">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" repeatCount="1"/>
            </path>
            <path stroke="#000" strokeWidth="6" d="M7.5 13.5l4 4l10.75 -10.75">
              <animate  fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" restart="never" repeatCount="0"/>
            </path>
            <path d="M7.5 13.5l4 4l10.75 -10.75">
                <animate  fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" restart="never" repeatCount="0"/>
            </path>
            </g></mask><rect width="24" height="24" fill="currentColor" mask={`url(#mask-${id})`}/>
          </svg>

    </div>
  )
}


