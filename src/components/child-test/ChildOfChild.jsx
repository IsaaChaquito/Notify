
import React from 'react'
import { useProvider } from '../../contexts/app-context/useProvider'
import Notify from '../notify/Notify'

export default function ChildOfChild() {

  const { notifyState } = useProvider()

  return (
    <>
      {
          notifyState?.notifies.map((notify) => { 
            return (
              <Notify 
                key={notify.id} 
                notification={notify}
              />
            )
          })
        }
    </>
  )
}
