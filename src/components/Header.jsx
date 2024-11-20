import React from 'react'
import { CheckIcon } from './notify/icons'
import { GithubIcon } from '../assets/icons/github'

const Header = () => {
  return (
    <div className="relative h-56 w-full overflow-hidden z-10">
      
      <div className='flex  flex-col justify-center items-center duration-300 z-50 p-2'>
        <h1 className="flex select-none h-auto text-6xl sm:text-7xl animate-[zoomIn_.4s_ease] font-bold text-center italic py-10 px-2 z-10 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-violet-700 duration-300">
          Just Notify
        </h1>

        

      </div>

      <div className="w-full h-full blur-xl bg-gradient-to-t from-[#242424] from-10%  to-indigo-700  absolute top-0  opacity-500"></div>
    </div>
  )
}

export default Header
