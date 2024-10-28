
import React from 'react'
import { useProvider } from '../contexts/app-context/useProvider'
import Notify from './notify/Notify'

export default function ChildOfChild() {

  const { notifications } = useProvider()

  return (
    <>
      {
          notifications.map((notify) => { 
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
