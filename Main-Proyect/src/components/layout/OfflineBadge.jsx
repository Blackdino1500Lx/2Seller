import { useOnline } from '../../hooks/useOnline'

export default function OfflineBadge({ pendingCount = 0 }) {
  const online = useOnline()
  if (online) return null

  return (
    <div className="mx-5 mt-3 flex items-center gap-2 text-xs bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-lg">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.58 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
      </svg>
      <span>
        <b>Sin conexión</b>
        {pendingCount > 0 && ` · ${pendingCount} pedido${pendingCount === 1 ? '' : 's'} pendiente${pendingCount === 1 ? '' : 's'}`}
      </span>
    </div>
  )
}