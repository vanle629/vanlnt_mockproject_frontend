import { Link } from 'react-router-dom'
export default function ProductCard({p}){
  return (
    <div className="border rounded bg-white p-3">
      <div className="bg-stone-100 h-40 mb-3" />
      <h3 className="font-medium">{p.title}</h3>
      <div className="text-sm text-gray-600">${p.default_price}</div>
      <Link to={`/product/${p.id}`} className="inline-block mt-3 text-sm text-white bg-black px-3 py-2 rounded">View</Link>
    </div>
  )
}
