import Navbar from './componenet/Navbar'
import { AuthProvider } from './context/AuthContext'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AddRecipe from './pages/AddRecipe'
import RecipeDetail from './pages/RecipeDetail'
import EditRecipe from './pages/EditRecipe'


function App() {
  

  return (
    <AuthProvider>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register" element ={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/add-recipe' element={<AddRecipe/>} />
        <Route path='/recipe/:id' element={<RecipeDetail/>} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>


    </AuthProvider>
  )
}

export default App
