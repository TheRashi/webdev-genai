import { useContext} from "react";
import { AuthContext } from "../auth.context.jsx";
import {login, register, logout, getme} from "../Services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
     if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    const { user, setUser, loading, setLoading } = context

   const handleLogin = async ({ email, password }) => {
  setLoading(true)

  try {
    const data = await login({ email, password })
    setUser(data.user)
    return data
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data || err.message)
    throw err
  } finally {
    setLoading(false)
  }
}  

    const handleRegister = async ({ username, email, password }) => {
  setLoading(true)

  try {
    const data = await register({ username, email, password })
    setUser(data.user)
    return data
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data || err.message)
    throw err
  } finally {
    setLoading(false)
  }
}
    const handleLogout = async() => {
        setLoading(true)
        try{
        const data = await logout()
        setUser(null)
    }catch(err){

    }finally{
        setLoading(false)
    }
}


    return { user, loading, handleRegister, handleLogin, handleLogout }
}