// import.meta is available in Vite/browser; for Node/Jest fallback to process.env
// Use process.env for tests; Vite can inject import.meta.env at build time if needed.
const API_BASE = (typeof process !== 'undefined' && process.env && process.env.VITE_API_BASE_URL) ? process.env.VITE_API_BASE_URL : ''

import auth from '../lib/auth'

async function getJSON(path, opts = {}){
  const res = await fetch(`${API_BASE}${path}`, opts)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function getOrders(){ return getJSON('/api/v1/orders') }
export function getInventory(){ return getJSON('/api/v1/inventory') }

// Auth-aware helpers
export function authGet(path){
  const headers = { ...auth.getAuthHeader(), Accept: 'application/json' }
  return getJSON(path, { headers })
}

export async function authPost(path, body = {}){
  const headers = { 'Content-Type': 'application/json', ...auth.getAuthHeader() }
  return getJSON(path, { method: 'POST', headers, body: JSON.stringify(body) })
}

export default { getOrders, getInventory, authGet, authPost }
