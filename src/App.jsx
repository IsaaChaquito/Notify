
import './App.css'
import { AppProvider } from './contexts/app-context/app-provider'
import NotifyList from './components/notify/NotifyList'
import AnotherChild from './components/AnotherChild'
import ButtonsControl from './components/ButtonsControl'

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
