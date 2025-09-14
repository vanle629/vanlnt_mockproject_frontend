import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/authContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    if (!email) return setError('Email is required')
    if (!password) return setError('Password is required')

    setLoading(true)
    try{
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const text = await res.text().catch(()=>null)
        throw new Error(text || `HTTP ${res.status}`)
      }
      const data = await res.json()
      // expect { token: '...' }
      if (data && data.token) {
        login(data.token)
        navigate('/account')
      } else {
        throw new Error('No token received')
      }
    }catch(err){
      setError(err.message || 'Login failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sign in</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <label className="block mb-2">
          <div className="text-sm mb-1">Email</div>
          <input
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block mb-4">
          <div className="text-sm mb-1">Password</div>
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Your password"
            required
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </main>
  )
}
