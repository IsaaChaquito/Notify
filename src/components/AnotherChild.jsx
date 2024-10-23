
import { useProvider } from "../contexts/app-context/useProvider"
import Notify from "./notify/Notify"


export default function AnotherChild() {

  const { notifications } = useProvider()

  return (
    <div className="flex flex-col items-center rounded-md p-2 bg-rose-300">
      <div>AnotherChild</div>

      <div className="ListContainerNotify flex flex-col  bg-indigo-600 max-w-[300px] max-h-[300px] gap-2 overflow-y-auto">
      {
            notifications.map((notify) => { 
              return (
                <Notify 
                  key={notify.id} 
                  {...notify}
                />
              )
            })
          }
      </div>
    </div>
  )
}
