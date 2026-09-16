import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email.trim(), password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(traducirError(err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      <div className="w-20 h-20 rounded-2xl bg-brand-600 flex items-center justify-center mb-6 shadow-lg shadow-brand-600/30">
        <span className="text-white text-4xl font-bold">P</span>
      </div>
      <h1 className="text-2xl font-bold mb-1">Pedidos</h1>
      <p className="text-slate-500 text-sm mb-10">Distribuidora Demo S.A.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        <Input
          label="Correo"
          type="email"
          autoComplete="email"
          placeholder="vendedor@test.local"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Ingresando…' : 'Ingresar'}
        </Button>
      </form>

      <button className="text-brand-600 font-medium text-sm mt-6">
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  )
}

function traducirError(msg) {
  if (!msg) return 'Error desconocido'
  if (msg.includes('Invalid login credentials')) return 'Correo o contraseña incorrectos'
  if (msg.includes('Email not confirmed')) return 'Debes confirmar tu correo primero'
  if (msg.includes('Network')) return 'Sin conexión con el servidor'
  return msg
}