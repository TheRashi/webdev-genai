import { Navigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"

const Protected = ({ children }) => {
  const { loading, user } = useAuth()

  console.log("PROTECTED:", { loading, user })

  if (loading) {
    return <main><h1>Loading...</h1></main>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default Protected