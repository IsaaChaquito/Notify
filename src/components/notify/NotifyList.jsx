
import Notify from "./Notify";
import useNotify from "./useNotify";

export default function NotifyList() {


  const { notifications, notify } = useNotify()


  const handleAddNotify = () => {
    notify.info('Error adding task',{
      showProgressBar: true, 
      timeSettings: {
        time: 10000,
        showTimer: true,
        timeFormat: 's'
      }
    })
    notify.success('Take care about you!',{
      showProgressBar: true,
      timeSettings:{
        time: 10000,
        showTimer: true,
        timeFormat: 's'
      }
    })
    notify.warning('Error adding task',{
      showProgressBar: true, 
      timeSettings: {
        time: 100000,
        showTimer: true,
        timeFormat: 's'
      }
    })
    notify.error('Error adding task',{
      showProgressBar: true, 
      timeSettings: {
        time: 10000,
        showTimer: true,
        timeFormat: 'ms'
      }
    })
    // notify.custom('Task added successfully')

  }
  

  return (
    <div className='flex flex-col items-center justify-center'>

        <button 
          onClick={ handleAddNotify } 
          className="p-3 bg-violet-700"
        > 
          AddToast
        </button>

        <div className='TOAST-CONTAINER flex flex-col gap-y-2 m-3 p-2'>
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
