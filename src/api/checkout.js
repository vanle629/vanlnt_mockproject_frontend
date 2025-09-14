export async function createCheckoutSession({ items = [], shipping = {}, successUrl = '/', cancelUrl = '/' } = {}){
  const base = import.meta.env.VITE_API_BASE_URL || ''
  const url = base ? `${base.replace(/\/$/, '')}/api/v1/checkout/session` : '/api/v1/checkout/session'
  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, shipping, successUrl, cancelUrl })
    })
    if(!res.ok) throw new Error('server error')
    const json = await res.json()
    // expect { url: 'https://checkout.stripe.com/...' }
    return json
  }catch(err){
    // fallback: return a local in-app confirmation URL with mock order id
    const orderId = `MOCK-${Date.now()}`
    return { url: `${window.location.origin}/checkout/confirmation?order=${encodeURIComponent(orderId)}` }
  }
}
