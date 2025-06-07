import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext( );

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token")

        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            axios.get("/api/auth/me").then((res) =>{
                setUser(res.data)
            })
        }
    },[])




    const login = async(email,password) =>{

    const res = await axios.post("/api/auth/login", {email, password})

    localStorage.setItem("token", res.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`

        setUser(res.data);
    }


    const register = async(userName, email, password)=>{

        try {
            const res = await axios.post('/api/auth/register',{userName, email, password})
            console.log( "res in register", res)
    
            localStorage.setItem("token", res.data.token)
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    
            setUser(res.data);  
        } catch (error) {
            console.log('error in register',error)
        }
    }


    const logout = async()=>{
        localStorage.removeItem("token");

        delete axios.defaults.headers.common['Authorization']
        setUser(null);
    }


    return(
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}


