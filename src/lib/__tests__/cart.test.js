import { getCart, addItem, updateItemQuantity, removeItem, clearCart } from '../cart'

beforeEach(()=> localStorage.clear())

test('addItem creates new cart entry', ()=>{
  const p = { id: 'p1', title: 'Shoe', default_price: 50 }
  const c = addItem(p, 2)
  expect(c.items.length).toBe(1)
  expect(c.items[0].productId).toBe('p1')
  expect(c.items[0].quantity).toBe(2)
})

test('updateItemQuantity updates and removes when zero', ()=>{
  const p = { id: 'p1', title: 'Shoe', default_price: 50 }
  const cart = addItem(p, 1)
  const key = cart.items[0].key
  const c2 = updateItemQuantity(key, 3)
  expect(c2.items[0].quantity).toBe(3)
  const c3 = updateItemQuantity(key, 0)
  expect(c3.items.length).toBe(0)
})

test('removeItem and clearCart', ()=>{
  const p = { id: 'p1', title: 'Shoe', default_price: 50 }
  const cart = addItem(p, 1)
  const key = cart.items[0].key
  const c2 = removeItem(key)
  expect(c2.items.length).toBe(0)
  addItem(p,1)
  const c3 = clearCart()
  expect(c3.items.length).toBe(0)
})
