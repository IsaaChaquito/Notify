

import ChildOfChild from "./ChildOfChild"



export default function AnotherChild() {


  return (
    <div className="flex flex-col items-center rounded-md p-2 bg-rose-300">
      <div>AnotherChild</div>

      <div className="ListContainerNotify flex flex-col  bg-indigo-600 max-w-[300px] max-h-[300px] gap-2 overflow-y-auto">
        
        <ChildOfChild />

      </div>
    </div>
  )
}
