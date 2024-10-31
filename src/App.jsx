
import './App.css'
import { AppProvider } from './contexts/app-context/app-provider'
import NotifyList from './components/notify/NotifyList'
import AnotherChild from './components/child-test/AnotherChild'
import ButtonsControl from './components/control-panel/ButtonsControl'

function App() {

  return (
    <AppProvider>

      <ButtonsControl />

      <NotifyList />
      {/* <AnotherChild /> */}

    </AppProvider>
  )
}

export default App
