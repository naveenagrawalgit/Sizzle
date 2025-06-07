import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login} =   useContext(AuthContext);
 const navigate = useNavigate()

 const handleSubmit = async(e)=>{
  e.preventDefault();

  try {
      await login(email,password);
     navigate("/");

  } catch (error) {
  console.log("error during lgoin submit", error); 
  }
 }




  return (
    <div className='max-w-md mx-auto p-4' >
     
        <h1 className='text-2xl font-bold mb-4'>Login</h1>    

      <form onSubmit={handleSubmit}>

                <div>
                    <label className='block text-gray-700'  >email</label>
                    <input 
                    required
                    className='w-full p-2  border-2 rounded'
                    value={email}
                    type='email'
                    onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                 <div>
                    <label className='block text-gray-700'  >  password</label>
                    <input 
                    required
                    className='w-full p-2  border-2 rounded'
                    value={password}
                    type='password'
                    onChange={(e)=> setPassword(e.target.value)}/>
                </div>

                <button className=' shadow-black shadow text-white p-2  bg-blue-500 rounded-2xl hover:bg-blue-700 '  type='submit'>Register</button>

            </form>
    </div>
  )
}

export default Login