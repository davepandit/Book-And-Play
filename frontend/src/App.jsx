import { useState } from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
