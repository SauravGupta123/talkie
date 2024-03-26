import './App.css'
import {Toaster} from 'react-hot-toast';
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/SignUp'
import Home from './pages/Home/Home'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser} = useAuthContext();
  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center'>
     <Routes> 
      <Route path="/" element={authUser? <Home/>:<Navigate to="/login"/>}>
      </Route>
      <Route path="/signup" element={authUser? <Navigate to="/"/>:<SignUp/>}>
      </Route>
      <Route path="/login" element={authUser? <Navigate to="/"/>:<Login/>}>
      </Route>
      </Routes>
      <Toaster/>
    

    </div>

    </>
  )
}

export default App
