
import { useEffect, useState } from 'react'

import useNotify from './notify/useNotify'

export const positions = {
  'top-right': 'top-right',
  'bottom-right': 'bottom-right',
  'bottom-center': 'bottom-center',
  'bottom-left': 'bottom-left',
  'top-left': 'top-left',
  'top-center': 'top-center',

}

export default function ButtonsControl() {


  const { notify, setNotifiesPosition, notifyState } = useNotify()
    const [counter, setCounter] = useState(0)

  const handlePositionList = () => {
    setCounter( counter => (counter + 1 === Object.keys(positions).length) ? 0 : counter + 1 )

    handleAddNotify()
  }

  useEffect(() => {
    const key = Object.keys(positions)[counter]
    setNotifiesPosition( positions[key] )
  }, [counter])


  const notyTypes = ['info', 'success', 'warning', 'error']
  const handleAddNotify = () => {

    // const rnd = Math.floor(Math.random() * notyTypes.length)
    // const randomNotifyCfg = {
    //   type: notyTypes[rnd],
    //   text: `I am a ${notyTypes[rnd]} Notify`,
    //   icon: notyTypes[rnd],
    //   autoClose: false,
    //   showProgressBar: rnd < 2 ? true : false,
    //   timeSettings: {
    //     duration: rnd * 1000 + 3000,
    //     showTimer: rnd % 2 === 0,
    //     timeFormat: rnd > 2 ? 's' : 'ms',
    //     timerPosition: rnd > 1  ? 'bottom-left' : 'bottom-right',
    //   }
    // }

    // notify[randomNotifyCfg.type](randomNotifyCfg.text, randomNotifyCfg)

    notify.info('I am an info Notify', { autoClose: false })
    notify.success('I am a success Notify', { autoClose: false })
    notify.warning('I am a warning Notify',   { autoClose: false })
    notify.error('I am an error Notify', { autoClose: false })
  }


  return (
    <section className='flex justify-center items-center mb-3 gap-3 *:duration-300  select-none'>
      <button onClick={handleAddNotify} className="p-2 bg-violet-800 rounded-xl hover:bg-violet-500 active:scale-95">
        Add Toast
      </button>

      <button onClick={ handlePositionList } className='p-2 rounded-xl group bg-black hover:bg-black/80 text-sm flex flex-col justify-center items-center '>
        <span>Alternate position</span>
        <code className='text-xs  p-1 rounded-full bg-gradient-to-tr from-blue-900 from-10% shadow-sm group-hover:shadow-blue-900 group-active:scale-75 duration-300' > 
          { notifyState?.screenPosition } 
        </code>
      </button>

    </section>
  )
}
