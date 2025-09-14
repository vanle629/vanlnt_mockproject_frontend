import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/authContext'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    if (!name) return setError('Name is required')
    if (!email) return setError('Email is required')
    if (!password) return setError('Password is required')
    if (password !== confirm) return setError('Passwords do not match')

    setLoading(true)
    try{
      const res = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      if (!res.ok) {
        const text = await res.text().catch(()=>null)
        throw new Error(text || `HTTP ${res.status}`)
      }
      const data = await res.json()
      if (data && data.token){
        login(data.token)
        navigate('/account')
      } else {
        navigate('/login')
      }
    }catch(err){
      setError(err.message || 'Signup failed')
    }finally{ setLoading(false) }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <label className="block mb-2">
          <div className="text-sm mb-1">Name</div>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Your name" />
        </label>
        <label className="block mb-2">
          <div className="text-sm mb-1">Email</div>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
        </label>
        <label className="block mb-2">
          <div className="text-sm mb-1">Password</div>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Password" />
        </label>
        <label className="block mb-4">
          <div className="text-sm mb-1">Confirm password</div>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Confirm password" />
        </label>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </div>
      </form>
    </main>
  )
}
