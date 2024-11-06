
import { AppProvider } from './context/app-provider'
import NotifyContainer from './components/notify/NotifyContainer'
import ButtonsControl from './components/control-panel/ButtonsControl'
import Header from './components/Header'

function App() {

  return (
    <AppProvider>
      <div className=" min-h-screen ">

        <Header />

        <ButtonsControl />
        <NotifyContainer />
      </div>
    </AppProvider>
  )
}

export default App
