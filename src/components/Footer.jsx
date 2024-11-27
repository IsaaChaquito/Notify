import { GithubIcon } from '../assets/icons/github'
import { HeartIcon } from '../assets/icons/heart'
import { LinkedInIcon } from '../assets/icons/linkedin'

export const Footer = () => {
  return (
    <div className=" py-5 w-full h-auto flex flex-col justify-around items-center  gap-5 bg-black border-t border-slate-600">
      <p className="flex justify-center items-center text-slate-400 rounded-full ">
        Created with 
        <HeartIcon title='Love' className="w-5 h-5 mx-1"/> by 
          <a 
            title='Isaac Castro G. on LinkedIn'
            className="pl-1 font-['mea\_culpa'] text-xl text-blue-5000 hover:text-blue-600 underline underline-offset-2 decoration-1" 
            href="https://www.linkedin.com/in/isaac-castro-guzmán-603a34211" target="_blank"
          >
            Isaac Castro G.
          </a>
      </p>

      <div className='icon-section flex justify-center items-center gap-x-3 *:text-gray-500 '>
        <a href="https://github.com/IsaaChaquito/Notify" target='_blank' className="cursor-pointer ">
          <GithubIcon className="w-5 h-5 hover:text-gray-400 duration-300"/>
        </a>

        <a href="https://www.linkedin.com/in/isaac-castro-guzmán-603a34211" target='_blank' className="cursor-pointer ">
          <LinkedInIcon className="w-5 h-5 cursor-pointer hover:text-gray-400 duration-300"/>
        </a>
        
      </div>

      <span className="text-xs text-slate-400">
        <span className="">{ `© ${new Date().getFullYear()} `}</span>
        <a 
          href="https://github.com/IsaaChaquito" target="_blank" className="cursor-pointer underline text-blue-500 hover:text-blue-600">
            IsaaChaquito 
        </a>
        <span className="">{ `, Inc. All rights reserved`} </span>
      </span>
    </div>
  )
}
