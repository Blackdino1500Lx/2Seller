import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NetworkProvider } from './context/NetworkContext'
import { router } from './router'

export default function App() {
  return (
    <AuthProvider>
      <NetworkProvider>
        <RouterProvider router={router} />
      </NetworkProvider>
    </AuthProvider>
  )
}