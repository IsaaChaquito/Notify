
import { AppProvider } from './context/app-provider'
import NotifyContainer from './components/notify/NotifyContainer'

import ButtonsControl from './components/control-panel/ButtonsControl'
import Header from './components/Header'
import { GithubIcon } from './assets/icons/github'


function App() {

  return (
    <AppProvider>
      <div className=" min-h-screen w-full flex flex-col items-center justify-center">

        <Header />

        <ButtonsControl />
        
        <NotifyContainer />

        <a href="https://github.com/IsaaChaquito/Notify" target='_blank' title='Github documentation' className='github-link cursor-pointer w-20 h-20 z-40 fixed flex items-start justify-end top-0 right-0 p-3 hover:scale-125 duration-300 bg-[#1a1a1a]/100'>
          <GithubIcon className="w-[50%] h-[50%] rotate-45 text-white" />
        </a>

      </div>
    </AppProvider>
  )
}

export default App
