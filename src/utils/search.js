// Simple search utility used by frontend mock API
export function searchProducts(products, {query = '', category = '', page = 1, size = 20} = {}){
  let items = products.slice()
  const q = (query || '').trim().toLowerCase()
  if(category){
    items = items.filter(p => (p.category_id || '').toLowerCase() === category.toLowerCase())
  }
  if(q){
    // naive full-text: check title and description and fallback to substring
    items = items.filter(p => {
      const hay = ((p.title || '') + ' ' + (p.description || '')).toLowerCase()
      return hay.includes(q)
    })
  }
  const total = items.length
  const start = (page - 1) * size
  const paged = items.slice(start, start + size)
  return { total, items: paged }
}
