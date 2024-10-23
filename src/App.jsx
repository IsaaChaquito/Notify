
import './App.css'
import { AppProvider } from './contexts/app-context/app-provider'
import NotifyList from './components/notify/NotifyList'
import AnotherChild from './components/AnotherChild'

function App() {

  return (
    <AppProvider>
      <NotifyList />
      {/* <AnotherChild /> */}
    </AppProvider>
  )
}

export default App
