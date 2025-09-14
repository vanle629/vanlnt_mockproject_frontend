import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, getReviews, postReview } from '../api/mock'
import { useState } from 'react'
import { addItem } from '../lib/cart'

export default function Product(){
  const { id } = useParams()
  const navigate = useNavigate()
  const p = getProductById(id)
  const [qty, setQty] = useState(1)
  const [selectedSku, setSelectedSku] = useState(p.skus && p.skus.length ? p.skus[0].skuId : null)
  const [reviews, setReviews] = useState(getReviews(p.id))
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  if(!p) return <div className="max-w-6xl mx-auto p-8">Product not found</div>

  function handleAdd(){
    const sku = p.skus && p.skus.find(s => s.skuId === selectedSku)
    addItem({ ...p, skuId: sku ? sku.skuId : null, size: sku ? sku.size : null }, qty)
    navigate('/cart')
  }

  function submitReview(e){
    e.preventDefault()
    const r = postReview(p.id, { author: 'Guest', rating: reviewRating, text: reviewText })
    setReviews(prev => [...prev, r])
    setReviewText('')
    setReviewRating(5)
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-stone-100 h-96" />
        <div>
          <h1 className="text-2xl font-bold">{p.title}</h1>
          <div className="text-xl text-gray-700 mt-2">${p.default_price}</div>
          <p className="mt-4 text-gray-600">{p.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <div>
              <label className="text-sm block">Size</label>
              <select value={selectedSku || ''} onChange={e => setSelectedSku(e.target.value)} className="border rounded px-2 py-1">
                {p.skus.map(s => (
                  <option key={s.skuId} value={s.skuId}>{s.size} {s.inventory === 0 ? '(Out)' : ''}</option>
                ))}
              </select>
            </div>

            <label className="text-sm">Quantity</label>
            <input type="number" min="1" max="99" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value || 1)))} className="w-20 border rounded px-2 py-1" />
            <button onClick={handleAdd} className="ml-4 bg-black text-white px-4 py-2 rounded">Add to cart</button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Reviews</h3>
            <div className="space-y-2 mt-2">
              {reviews.length === 0 && <div className="text-sm text-gray-600">No reviews yet</div>}
              {reviews.map(r => (
                <div key={r.id} className="border rounded p-2">
                  <div className="font-medium">{r.author} <span className="text-sm text-gray-500">({r.rating}★)</span></div>
                  <div className="text-sm text-gray-700">{r.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={submitReview} className="mt-4">
              <label className="block text-sm">Your review</label>
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} className="w-full border rounded p-2 mt-1" />
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm">Rating</label>
                <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="border rounded px-2 py-1">
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button className="ml-auto bg-black text-white px-3 py-1 rounded" type="submit">Post review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
