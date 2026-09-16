import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import AppShell from '../components/layout/AppShell'
import OfflineBadge from '../components/layout/OfflineBadge'
import SearchInput from '../components/ui/SearchInput'
import CustomerList from '../components/customers/CustomerList'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function CustomersPage() {
  const { profile, signOut } = useAuth()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError('')
      const { data, error } = await supabase
        .from('customers')
        .select('id, nombre, identificacion, telefono, direccion, activo')
        .eq('activo', true)
        .order('nombre', { ascending: true })

      if (!mounted) return
      if (error) {
        setError(error.message)
      } else {
        setCustomers(data ?? [])
      }
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  const initials = useMemo(() => {
    if (!profile?.nombre) return '··'
    return profile.nombre
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }, [profile])

  return (
    <AppShell>
      {/* Cabecera con saludo */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Buenos días,</p>
            <h1 className="text-xl font-bold truncate">{profile?.nombre ?? 'Vendedor'}</h1>
          </div>
          <button
            onClick={signOut}
            className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600 text-sm flex-shrink-0"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            {initials}
          </button>
        </div>
      </div>

      <OfflineBadge />

      {/* Buscador */}
      <div className="px-5 pt-3 pb-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar cliente…" />
      </div>

      {/* Lista */}
      <div className="px-5 pb-6 flex-1">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <EmptyState
            title="Error al cargar clientes"
            description={error}
            action={<Button onClick={() => window.location.reload()}>Reintentar</Button>}
          />
        ) : (
          <CustomerList customers={customers} query={query} />
        )}
      </div>
    </AppShell>
  )
}