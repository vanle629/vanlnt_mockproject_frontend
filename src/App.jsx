import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import Search from './pages/Search'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutConfirmation from './pages/CheckoutConfirmation'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
import { AuthProvider } from './lib/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/cart" element={<Cart/>} />
  <Route path="/checkout" element={<Checkout/>} />
  <Route path="/checkout/confirmation" element={<CheckoutConfirmation/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
  <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
        <Route path="/admin" element={<Admin/>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
