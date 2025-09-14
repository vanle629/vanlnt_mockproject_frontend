import { useState } from 'react'
import { getCart, clearCart } from '../lib/cart'
import { createCheckoutSession } from '../api/checkout'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const navigate = useNavigate()
  const cart = getCart()
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', postal: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const total = cart.items.reduce((s,i) => s + (i.price * i.quantity), 0)

  async function handlePay(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const items = cart.items.map(i => ({ sku: i.skuId || i.productId, quantity: i.quantity, price: i.price }))
      const res = await createCheckoutSession({ items, shipping, successUrl: `${window.location.origin}/`, cancelUrl: `${window.location.origin}/cart` })
      if(res && res.url){
        // In real flow we redirect to Stripe Checkout
        window.location.href = res.url
      } else {
        throw new Error('no checkout url')
      }
    }catch(err){
      setError(err.message || 'Failed to create checkout')
      setLoading(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.items.length === 0 ? (<div>Your cart is empty</div>) : (
        <form onSubmit={handlePay} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold">Shipping</h2>
            <label className="block text-sm mt-2">Name</label>
            <input required value={shipping.name} onChange={e => setShipping(s => ({ ...s, name: e.target.value }))} className="w-full border rounded px-2 py-2" />
            <label className="block text-sm mt-2">Address</label>
            <input required value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} className="w-full border rounded px-2 py-2" />
            <div className="flex gap-2 mt-2">
              <input required value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} placeholder="City" className="w-1/2 border rounded px-2 py-2" />
              <input required value={shipping.postal} onChange={e => setShipping(s => ({ ...s, postal: e.target.value }))} placeholder="Postal" className="w-1/2 border rounded px-2 py-2" />
            </div>
            <div className="mt-4">
              <button disabled={loading} type="submit" className="bg-black text-white px-4 py-2 rounded">Pay ${total.toFixed(2)}</button>
            </div>
            {error && <div className="mt-2 text-red-600">{error}</div>}
          </div>

          <aside>
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-2 space-y-2">
              {cart.items.map(i => (
                <div key={i.key} className="flex items-center justify-between">
                  <div>{i.title} {i.size ? `— ${i.size}` : ''} x{i.quantity}</div>
                  <div>${(i.price * i.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>
          </aside>
        </form>
      )}
    </main>
  )
}
