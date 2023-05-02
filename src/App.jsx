import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import style from './app.module.css'
import AppHeader from './components/header/app-header/app-header'
import ForgotPasswordPage from './pages/auth/forgot-password-page/forgot-password-page'
import LoginPage from './pages/auth/login-page/login-page'
import ProfilePage from './pages/auth/profile-page/profile-page'
import RegisterPage from './pages/auth/register-page/register-page'
import ResetPasswordPage from './pages/auth/reset-password-page/reset-password-page'
import NotFoundPage from './pages/errors/not-found/not-found'
import HomePage from './pages/home-page/home-page'

function App() {
  return (
    <main className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <AppHeader />
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            {/* <Route path='/ingredients/:id' element={<RegisterPage />} /> */}

            {/* TODO Next sprint. */}
            <Route path='/profile/orders' element={<NotFoundPage />} />
            <Route path='/logout' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </main>
  )
}

export default App
