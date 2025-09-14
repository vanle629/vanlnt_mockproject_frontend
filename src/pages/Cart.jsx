import { useState, useEffect } from 'react'
import { getCart, updateItemQuantity, removeItem, clearCart } from '../lib/cart'
import { Link } from 'react-router-dom'

export default function Cart(){
  const [cart, setCart] = useState({ items: [] })

  useEffect(() => {
    setCart(getCart())
  }, [])

  function onQtyChange(key, value){
    const next = updateItemQuantity(key, Number(value))
    setCart(next)
  }

  function onRemove(key){
    const next = removeItem(key)
    setCart(next)
  }

  function onClear(){
    const next = clearCart()
    setCart(next)
  }

  const total = cart.items.reduce((s,i) => s + (i.price * i.quantity), 0)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div>No items in cart. <Link to="/">Continue shopping</Link></div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.key} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">{item.title} {item.size ? `— ${item.size}` : ''}</div>
                  <div className="text-sm text-gray-600">${item.price} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min="0" max="99" value={item.quantity} onChange={e => onQtyChange(item.key, e.target.value)} className="w-20 border rounded px-2 py-1" />
                  <button onClick={() => onRemove(item.key)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="font-semibold">Total: ${total.toFixed(2)}</div>
            <div className="flex gap-2">
              <button onClick={onClear} className="px-3 py-1 border rounded">Clear</button>
              <Link to="/checkout" className="bg-black text-white px-4 py-2 rounded">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
