import React from 'react'
import Notify from './notify/Notify'
import { notifyModel } from './notify/model'

const Header = () => {
  return (
    <div className='flex justify-center h-[20rem] w-full bg-gradient-to-t from-[#242424] from-10%  to-violet-700 duration-300'>
      <h1 className=" text-7xl font-bold text-center bg-red-501 italic py-10">
        Just Notify!
        <Notify 
          notification={
            notifyModel(
              'promise', 
              'Just Notify!', 
              { filled: true, icon: 'success' }
            )
          } 
        />
      </h1>

      {/* <ol className='p-3'>
        <li>Discord</li>
        <li>Discord</li>
        <li>Discord</li>
      </ol> */}



    </div>
  )
}

export default Header
