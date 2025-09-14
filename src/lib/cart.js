
const KEY = 'solemate_cart_v1'

function read(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  }catch(e){
    return { items: [] }
  }
}

function write(cart){
  try{ localStorage.setItem(KEY, JSON.stringify(cart)) } catch(e){}
}

function makeItemKey(product){
  // composite key so same product with different SKU is distinct
  return product.id + (product.skuId ? `::${product.skuId}` : '')
}

export function getCart(){
  return read()
}

export function addItem(product, quantity = 1){
  const cart = read()
  const key = makeItemKey(product)
  const idx = cart.items.findIndex(i => i.key === key)
  const entry = {
    key,
    productId: product.id,
    skuId: product.skuId || null,
    size: product.size || null,
    title: product.title,
    price: product.default_price || product.price || 0,
    quantity
  }
  if(idx === -1) cart.items.push(entry)
  else cart.items[idx].quantity = Math.min(99, cart.items[idx].quantity + quantity)
  write(cart)
  return cart
}

export function updateItemQuantity(itemKey, quantity){
  const cart = read()
  const idx = cart.items.findIndex(i => i.key === itemKey)
  if(idx !== -1){
    if(quantity <= 0) cart.items.splice(idx,1)
    else cart.items[idx].quantity = Math.min(99, quantity)
    write(cart)
  }
  return cart
}

export function removeItem(itemKey){
  const cart = read()
  cart.items = cart.items.filter(i => i.key !== itemKey)
  write(cart)
  return cart
}

export function clearCart(){ write({ items: [] }); return { items: [] } }
