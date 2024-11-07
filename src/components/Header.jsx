import React from 'react'
import { CheckIcon } from './notify/icons'

const Header = () => {
  return (
    <div className="relative">
      <div className='flex flex-col justify-center items-center h-80 w-full bg-gradient-to-t from-[#242424] from-10%  to-violet-700  duration-300 z-50'>
      <h1 className="flex  h-auto text-7xl animate-[zoomIn_.4s_ease] font-bold text-center italic py-10 px-2 text-white ">
        Just Notify
        <CheckIcon className="text-8xl"/>
      </h1>

      {/* <ol className='p-3'>
        <li>Discord</li>
        <li>Discord</li>
        <li>Discord</li>
      </ol> */}



    </div>
    <div className="w-full h-80 blur-3xl rounded bg-red-500  absolute top-0  opacity-30"></div>
    </div>
  )
}

export default Header
