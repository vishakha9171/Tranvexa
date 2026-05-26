import useAuth from './hooks/useAuth'
import Dashboard from './pages/Dashboard'
import PublicLanding from './pages/PublicLanding'

function App() {
  const {isLogin}=useAuth()
  return  isLogin? <Dashboard/> : <PublicLanding/>
}

export default App
