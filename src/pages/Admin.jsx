import { useEffect, useState } from 'react'
import { getOrders, getInventory } from '../api/backend'

export default function Admin(){
  const [orders, setOrders] = useState(null)
  const [inventory, setInventory] = useState(null)
  const [error, setError] = useState(null)

  async function refresh(){
    try{
      const [o, inv] = await Promise.all([getOrders(), getInventory()])
      setOrders(o)
      setInventory(inv.inventory || inv)
      setError(null)
    }catch(e){ setError(e.message) }
  }

  useEffect(()=>{ refresh() }, [])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin</h1>
        <button onClick={refresh} className="px-3 py-1 bg-gray-800 text-white rounded">Refresh</button>
      </div>
      {error && <div className="text-red-600">Error: {error}</div>}

      <section className="mt-6">
        <h2 className="font-semibold">Inventory</h2>
        {!inventory && <div>Loading...</div>}
        {inventory && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(inventory).map(([sku,qty])=> (
              <div key={sku} className="p-2 border rounded">{sku}: <strong>{qty}</strong></div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Orders</h2>
        {!orders && <div>Loading...</div>}
        {orders && orders.map(o=> (
          <div key={o.id} className="p-3 border rounded my-2">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{o.id}</div>
                <div className="text-sm text-gray-600">{new Date(o.created_at).toLocaleString()}</div>
              </div>
              <div className="text-right">${(o.total||0).toFixed(2)}<div className="text-sm">{o.status}</div></div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
