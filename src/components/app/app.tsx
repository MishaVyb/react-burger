import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import ForgotPasswordPage from '../../pages/auth/forgot-password-page/forgot-password-page'
import LoginPage from '../../pages/auth/login-page/login-page'
import RegisterPage from '../../pages/auth/register-page/register-page'
import ResetPasswordPage from '../../pages/auth/reset-password-page/reset-password-page'
import NotFoundPage from '../../pages/errors/not-found/not-found'
import HomePage from '../../pages/home-page/home-page'
import ProfileOrdersPage from '../../pages/profile/orders-page/orders-page'
import ProfilePage from '../../pages/profile/profile-page/profile-page'
import RouteDispatch from '../../utils/route-dispatch'
import AppHeader from '../header/app-header/app-header'
import IngredientDetailModal from '../ingredients/ingredient-detail-modal/ingredient-detail-modal'
import style from './style.module.css'

const App: FC = () => {
  return (
    <main className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <AppHeader />
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/' element={<HomePage />} />
            <Route
              path='/login'
              element={
                <RouteDispatch>
                  <LoginPage />
                </RouteDispatch>
              }
            />
            <Route
              path='/register'
              element={
                <RouteDispatch>
                  <RegisterPage />
                </RouteDispatch>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <RouteDispatch>
                  <ForgotPasswordPage />
                </RouteDispatch>
              }
            />
            <Route
              path='/reset-password'
              element={
                <RouteDispatch>
                  <ResetPasswordPage />
                </RouteDispatch>
              }
            />
            <Route
              path='/profile'
              element={
                <RouteDispatch loginRequired>
                  <ProfilePage />
                </RouteDispatch>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <RouteDispatch loginRequired>
                  <ProfileOrdersPage />
                </RouteDispatch>
              }
            />
            <Route
              path='/ingredients/:id'
              element={<IngredientDetailModal backgroundPath='/' backgroundElement={<HomePage />} />}
            />
          </Routes>
        </Router>
      </DndProvider>
    </main>
  )
}

export default App
