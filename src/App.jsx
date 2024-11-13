
import { AppProvider } from './context/app-provider'
import NotifyContainer from './components/notify/NotifyContainer'
import NotifyContainerWithTransition from './components/notify/NotifyContainerWithTransition'
import ButtonsControl from './components/control-panel/ButtonsControl'
import Header from './components/Header'


function App() {

  return (
    <AppProvider>
      <div className=" min-h-screen ">

        <Header />

        <ButtonsControl />
        <NotifyContainer />
        {/* <NotifyContainerWithTransition /> */}

      </div>
    </AppProvider>
  )
}

export default App
