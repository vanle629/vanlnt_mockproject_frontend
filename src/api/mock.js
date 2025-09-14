const PRODUCTS = [
  { id: 'p1', title: 'Running Shoes', description: 'Lightweight running shoes', default_price: 99, category_id: 'shoes', skus: [
    { skuId: 'p1-s1', size: '8', inventory: 5 },
    { skuId: 'p1-s2', size: '9', inventory: 10 },
    { skuId: 'p1-s3', size: '10', inventory: 0 }
  ]},
  { id: 'p2', title: 'Trail Sneakers', description: 'All-terrain sneakers', default_price: 129, category_id: 'sneakers', skus: [
    { skuId: 'p2-s1', size: '8', inventory: 3 },
    { skuId: 'p2-s2', size: '9', inventory: 2 }
  ]},
  { id: 'p3', title: 'Casual Slip-ons', description: 'Comfortable daily slip-ons', default_price: 79, category_id: 'casual', skus: [
    { skuId: 'p3-s1', size: 'M', inventory: 7 }
  ]}
]

export function getProducts(){
  return PRODUCTS
}

export function getProductById(id){
  return PRODUCTS.find(p => p.id === id)
}

// network-backed fetch that attempts to call a real API and falls back to local PRODUCTS
export async function fetchProducts(){
  const base = import.meta.env.VITE_API_BASE_URL || ''
  const url = base ? `${base.replace(/\/$/, '')}/api/v1/products` : '/api/v1/products'
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
    if(!res.ok) throw new Error('non-2xx')
    const json = await res.json()
    // Accept either { items: [...] } or an array
    if(Array.isArray(json)) return json
    if(json && json.items) return json.items
    return PRODUCTS
  } catch (err) {
    // fallback to local data
    return PRODUCTS
  }
}

// simple client-side reviews stored in localStorage
const REVIEWS_KEY = 'solemate_reviews_v1'
function readReviews(){
  try{ return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]') } catch(e){ return [] }
}

export function getReviews(productId){
  return readReviews().filter(r => r.productId === productId)
}

export function postReview(productId, { author = 'Anonymous', rating = 5, text = '' } = {}){
  const reviews = readReviews()
  const entry = { id: `r_${Date.now()}`, productId, author, rating, text, created_at: new Date().toISOString() }
  reviews.push(entry)
  try{ localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews)) }catch(e){}
  return entry
}
