
import { AppProvider } from './contexts/app-context/app-provider'
import NotifyContainer from './components/notify/NotifyContainer'
import ButtonsControl from './components/control-panel/ButtonsControl'

function App() {

  return (
    <AppProvider>
      <ButtonsControl />
      <NotifyContainer />
    </AppProvider>
  )
}

export default App
