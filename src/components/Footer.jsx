import { HeartIcon } from '../assets/icons/heart'

export const Footer = () => {
  return (
    <div className=" p-5 w-full h-32 flex flex-col justify-around items-center  gap-5 bg-black border-t border-slate-600">
      <p className="flex justify-center items-center text-slate-400 rounded-full ">
        Created with 
        <HeartIcon title='Love' className="w-5 h-5 mx-1"/> by 
          <a 
            title='Isaac Castro G. on LinkedIn'
            className="pl-1 font-['mae\_culpa'] text-xl text-blue-500 underline underline-offset-2 decoration-1" 
            href="https://www.linkedin.com/in/isaac-castro-guzmán-603a34211" target="_blank"
          >
            Isaac Castro G.
          </a>
      </p>

      <span className="text-xs">
        <span className="">{ `© ${new Date().getFullYear()} `}</span>
        <a 
          href="https://github.com/IsaaChaquito" target="_blank" className="cursor-pointer underline text-blue-500 ">
            IsaaChaquito 
        </a>
        <span className="">{ `, Inc. All rights reserved`} </span>
      </span>
    </div>
  )
}
