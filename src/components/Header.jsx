import { LinkIcon } from '../assets/icons/link'

const Header = () => {
  return (
    <div className="relative h-56 w-full overflow-hidden z-10">
      
      <div className='flex flex-col justify-center items-center py-8 z-50 p-2 *:animate-[zoomIn_.4s_ease] '>
        <h1 className="flex select-none h-auto text-5xl sm:text-7xl  font-bold text-center italic py-2 sm:py-3 px-2 z-10 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-violet-700 duration-300">
          Just Notify
        </h1>

        {/* <h1 className='text-5xl sm:text-8xl z-50 duration-75'>JUST NOTIFY</h1> */}

        <a href="https://tailwindcss.com/" target='_blank' title='Tailwind documentation' className="group py-2  duration-300 text-white z-50 hover:underline decoration-pink-500 underline-offset-2">
          <h3 className="group-hover: flex gap-x-1 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-violet-700 group-hover:from-rose-600 group-hover:to-violet-800 ">
            Made with Tailwind
            <LinkIcon className="group-hover:scale-110 w-3.5 h-3.5 inline text-blue-500 duration-150"/>
          </h3>
        </a>
        

      </div>

      <div className="w-full h-full blur-xl bg-gradient-to-t from-[#242424] from-10%  to-indigo-700  absolute top-0  opacity-500"></div>
      {/* <div className="w-full h-full blur-xl bg-gradient-to-t from-[#242424] from-10%  to-white  absolute top-0  opacity-500"></div> */}
    </div>
  )
}

export default Header
