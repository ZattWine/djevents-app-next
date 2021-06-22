import { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // register
  const register = async (user) => {
    console.log(user)
  }

  // login
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password })
  }

  // logout
  const logout = () => {
    console.log('logout')
  }

  // check user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log('check!')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
