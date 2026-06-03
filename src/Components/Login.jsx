import { useState, useRef } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from '@tanstack/react-router'

export default function Login() {
  const { login, loginLoading, loginError } = useContext(AuthContext)
  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')

    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      await login(email, password)
      navigate({ to: '/users' })
    } catch {
      setError('Credenciales incorrectas')
    }
  }

  const displayError = error || (loginError ? 'Credenciales incorrectas' : '')

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          ref={emailRef}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          ref={passwordRef}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loginLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {loginLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
        {displayError && (
          <p className="mt-2 text-sm text-red-600">{displayError}</p>
        )}
      </form>
    </div>
  )
}
