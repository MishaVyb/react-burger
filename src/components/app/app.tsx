import { FC } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import ForgotPasswordPage from '../../pages/auth/forgot-password-page/forgot-password-page'
import LoginPage from '../../pages/auth/login-page/login-page'
import RegisterPage from '../../pages/auth/register-page/register-page'
import ResetPasswordPage from '../../pages/auth/reset-password-page/reset-password-page'
import NotFoundPage from '../../pages/errors/not-found/not-found'
import FeedOrderDetailPage from '../../pages/feed-order-detail/feed-order-detail-page'
import FeedPage from '../../pages/feed/feed-page'
import HomePage from '../../pages/home/home-page'
import IngredientDetailPage from '../../pages/ingredient-detail/ingredient-detail-page'
import ProfileOrdersPage from '../../pages/profile/orders-page/orders-page'
import ProfilePage from '../../pages/profile/profile-page/profile-page'
import OrderDetailModal from '../feed/order-detail-modal/order-detail-modal'
import AppHeader from '../header/app-header/app-header'
import IngredientDetailModal from '../ingredients/ingredient-detail-modal/ingredient-detail-modal'
import RouteDispatch from '../routes-dispatch/route-dispatch'
import style from './style.module.css'

const App: FC = () => {
  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  return (
    <div className={style.container}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:id' element={<FeedOrderDetailPage />} />
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
          path='/profile/orders/:id'
          element={
            <RouteDispatch loginRequired>
              <FeedOrderDetailPage />
            </RouteDispatch>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetailPage />} />
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientDetailModal />} />
          <Route path='/feed/:id' element={<OrderDetailModal />} />
          <Route path='/profile/orders/:id' element={<OrderDetailModal />} />
        </Routes>
      )}
    </div>
  )
}

export default App
