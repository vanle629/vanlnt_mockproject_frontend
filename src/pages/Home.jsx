import ProductCard from '../components/ProductCard'
import { getProducts } from '../api/mock'

export default function Home(){
  const products = getProducts()
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured products</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </main>
  )
}
