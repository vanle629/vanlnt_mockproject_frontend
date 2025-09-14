import { searchProducts } from '../search'

const PRODUCTS = [
  { id: 'p1', title: 'Running Shoes', description: 'Lightweight running shoes', default_price: 99, category_id: 'shoes' },
  { id: 'p2', title: 'Trail Sneakers', description: 'All-terrain sneakers', default_price: 129, category_id: 'sneakers' },
  { id: 'p3', title: 'Casual Slip-ons', description: 'Comfortable daily slip-ons', default_price: 79, category_id: 'casual' }
]

test('search by query returns matches', () => {
  const res = searchProducts(PRODUCTS, {query: 'running', page:1, size:10})
  expect(res.total).toBe(1)
  expect(res.items[0].id).toBe('p1')
})

test('filter by category', () => {
  const res = searchProducts(PRODUCTS, {category: 'sneakers', page:1, size:10})
  expect(res.total).toBe(1)
  expect(res.items[0].id).toBe('p2')
})
