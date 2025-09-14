import { createContext, useContext, useEffect, useState } from 'react'
import auth from './auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => auth.getToken())

  useEffect(()=>{
    // listen for other tabs changing auth
    function onStorage(e){ if (e.key === 'solemate_token_v1') setToken(auth.getToken()) }
    window.addEventListener('storage', onStorage)
    return ()=>window.removeEventListener('storage', onStorage)
  },[])

  function login(tokenValue){
    auth.setToken(tokenValue)
    setToken(tokenValue)
  }

  function logout(){
    auth.clearToken()
    setToken(null)
  }

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default { AuthProvider, useAuth }
