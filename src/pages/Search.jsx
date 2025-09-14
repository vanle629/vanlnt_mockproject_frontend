import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../api/mock'
import { searchProducts } from '../utils/search'

export default function Search(){
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState({total:0, items:[]})

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProducts().then(list => {
      if(!mounted) return
      setAllProducts(list || [])
      const res = searchProducts(list || [], {query, category, page, size:8})
      setResults(res)
      setLoading(false)
    }).catch(err => {
      if(!mounted) return
      setError(err.message || 'Failed to load products')
      setAllProducts([])
      setResults({total:0, items:[]})
      setLoading(false)
    })
    return () => { mounted = false }
  }, [query, category, page])

  // derive category list from fetched products
  const categories = Array.from(new Set(allProducts.map(p => p.category_id).filter(Boolean)))

  const totalPages = Math.max(1, Math.ceil(results.total / 8))

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Filters</h4>
            <label className="block text-sm mb-1">Category</label>
            <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }} className="w-full border rounded px-2 py-2">
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
        </aside>

        <section className="md:col-span-3">
          <SearchBar initialQuery={query} onSearch={(q) => { setQuery(q); setPage(1) }} />
          {loading ? (
            <div className="mt-6">Loading products...</div>
          ) : error ? (
            <div className="mt-6 text-red-600">{error}</div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.items.map(p => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">{results.total} results</div>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="px-3 py-1 border rounded">Prev</button>
              <div className="px-3 py-1">{page} / {totalPages}</div>
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
