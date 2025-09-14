import { useEffect, useState } from 'react'
import { getOrders } from '../api/backend'

export default function Account(){
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    getOrders().then(setOrders).catch(e=>setError(e.message))
  },[])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order history</h1>
      {error && <div className="text-red-600">Error: {error}</div>}
      {!orders && !error && <div>Loading...</div>}
      {orders && orders.length===0 && <div>No orders yet.</div>}
      {orders && orders.map(o=> (
        <section key={o.id} className="p-4 border rounded mb-4">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">Order {o.id}</div>
              <div className="text-sm text-gray-600">{new Date(o.created_at).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${(o.total||0).toFixed(2)}</div>
              <div className="text-sm text-gray-600">{o.status}</div>
            </div>
          </div>
          <ul className="mt-3">
            {(o.items||[]).map((it,idx)=> (
              <li key={idx} className="text-sm">{it.quantity} × {it.title || it.sku} — ${(it.price||0).toFixed(2)}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
