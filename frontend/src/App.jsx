import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppRoutes from './routes/AppRoutes'

import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<AppRoutes />
<ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop pauseOnHover theme='light'/>

</>
  )
}

export default App
