
import './App.css'
import { AppProvider } from './contexts/app-context/app-provider'
import NotifyContainer from './components/notify/NotifyContainer'
import ButtonsControl from './components/control-panel/ButtonsControl'

function App() {

  return (
    <AppProvider>

      <ButtonsControl />

      <NotifyContainer />
      {/* <AnotherChild /> */}

    </AppProvider>
  )
}

export default App
