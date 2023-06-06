import { RootState } from '../store'

export const selectAuthRequestStatus = (state: RootState): [boolean, string | undefined] => [
  state.auth.pendingRequest,
  state.auth.error,
]
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken
