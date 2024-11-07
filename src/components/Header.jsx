import React from 'react'
import { CheckIcon } from './notify/icons'

const Header = () => {
  return (
    <div className="relative">
      
      <div className='flex flex-col justify-center items-center h-80 w-full   duration-300 z-50'>
      <h1 className="flex select-none h-auto text-7xl animate-[zoomIn_.4s_ease] font-bold text-center italic py-10 px-2 text-white z-50 drop-shadow-lg">
        Just Notify
        <CheckIcon className="text-8xl"/>
      </h1>

      {/* <ol className='p-3'>
        <li>Discord</li>
        <li>Discord</li>
        <li>Discord</li>
      </ol> */}



    </div>
    <div className="w-full h-80 blur-xl bg-gradient-to-t from-[#242424] from-10%  to-indigo-700  absolute top-0  opacity-500"></div>
    </div>
  )
}

export default Header
