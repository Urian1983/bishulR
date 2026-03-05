import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ToastProvider } from './atoms/Toast/ToastContainer'

// Layout
import MainLayout from './templates/MainLayout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

// Guard de ruta privada
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Guard de ruta admin
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

const App = () => {
  return (
    <ToastProvider>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"             element={<HomePage />} />
        <Route path="/products"     element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart"         element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/orders"       element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/profile"      element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/admin"        element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Route>

      {/* Auth pages fuera del layout principal */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
