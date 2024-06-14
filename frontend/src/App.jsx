import { useState } from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Private from './components/Private'
import MyBookings from './pages/MyBookings'
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

        {/* here goes the private route  */}
        <Route path='' element={<Private />}>
        <Route path='/mybookings' element={<MyBookings />}/>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
