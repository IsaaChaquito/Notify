import React from 'react'
import { CheckIcon } from './notify/icons'
import { GithubIcon } from '../assets/icons/github'

const Header = () => {
  return (
    <div className="relative h-56 w-full overflow-hidden">
      
      <div className='flex  flex-col justify-center items-center duration-300 z-50 p-2'>
        <h1 className="flex  select-none h-auto text-6xl sm:text-7xl animate-[zoomIn_.4s_ease] font-bold text-center italic py-10 px-2 z-10 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-violet-700 duration-300">
          Just Notify
        </h1>

        <a href="https://github.com/IsaaChaquito/Notify" target='_blank' title='Github documentation' className='github-link cursor-pointer w-20 h-20 z-50 fixed flex items-start justify-end top-0 right-0 p-3 hover:scale-125 duration-300 bg-[#1a1a1a]/100'>
          <GithubIcon className="w-[50%] h-[50%] rotate-45 z-50 text-white" />
        </a>

      </div>

      <div className="w-full h-full blur-xl bg-gradient-to-t from-[#242424] from-10%  to-indigo-700  absolute top-0  opacity-500"></div>
    </div>
  )
}

export default Header
