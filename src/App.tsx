import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const AuthRoute = () => {
  const { mode } = useParams()

  if (mode === 'login') return <LoginPage />
  if (mode === 'register') return <RegisterPage />

  return <Navigate to="/" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:mode" element={<AuthRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App