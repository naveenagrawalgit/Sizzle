import Navbar from './componenet/Navbar'
import { AuthProvider } from './context/AuthContext'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AddRecipe from './pages/AddRecipe'


function App() {
  

  return (
    <AuthProvider>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register" element ={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/add-recipe' element={<AddRecipe/>} />
      </Routes>


    </AuthProvider>
  )
}

export default App
