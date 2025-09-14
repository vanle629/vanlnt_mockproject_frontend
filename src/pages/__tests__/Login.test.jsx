import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'
import Header from '../../components/Header'
import { AuthProvider } from '../../lib/authContext'

function renderWithRouter(ui){
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )
}

beforeEach(()=>{
  // clear storage and mocks
  localStorage.clear()
  global.fetch = jest.fn()
})

test('successful login updates auth context and shows Logout', async ()=>{
  const fakeToken = 'tok_123'
  global.fetch.mockResolvedValueOnce({ ok: true, json: async ()=>({ token: fakeToken }) })

  // render Header so we can observe auth-driven UI changes
  renderWithRouter(
    <>
      <Header />
      <Login />
    </>
  )

  // Logout should not be visible before sign in
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull()

  fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'user@example.com' } })
  fireEvent.change(screen.getByPlaceholderText(/your password/i), { target: { value: 'pass' } })
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

  await waitFor(()=> expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument())
})
