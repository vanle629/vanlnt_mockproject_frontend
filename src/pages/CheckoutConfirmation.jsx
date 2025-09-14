import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { clearCart } from '../lib/cart'

export default function CheckoutConfirmation(){
  const [params] = useSearchParams()
  const orderId = params.get('order') || `MOCK-${Date.now()}`
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    clearCart()
    setCleared(true)
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Order confirmed</h1>
      <p className="mt-4">Thank you! Your order <span className="font-mono">{orderId}</span> has been received (mock).</p>
      {cleared && <p className="mt-2 text-sm text-gray-600">Your cart was cleared.</p>}
      <div className="mt-6">
        <Link to="/" className="text-white bg-black px-4 py-2 rounded">Continue shopping</Link>
      </div>
    </main>
  )
}
