import { useState } from 'react'

export default function SearchBar({onSearch, initialQuery = ''}){
  const [q, setQ] = useState(initialQuery)
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(q) }} className="flex gap-2">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search products..."
        className="flex-1 border rounded px-3 py-2"
        aria-label="search"
      />
      <button className="bg-black text-white px-4 py-2 rounded" type="submit">Search</button>
    </form>
  )
}
