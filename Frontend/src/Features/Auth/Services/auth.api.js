import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
})

export const register = async ({ username, email, password }) => {
  const response = await API.post("/register", {
    username,
    email,
    password,
  })

  return response.data
}

export const login = async ({ email, password }) => {
  const response = await API.post("/login", {
    email,
    password,
  })

  return response.data
}

export const logout = async () => {
  const response = await API.get("/logout")
  return response.data
}

export const getme = async () => {
  const response = await API.get("/get-me")
  return response.data
}