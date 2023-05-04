export const selectAuthRequestStatus = (store) => [store.auth.pendingRequest, store.auth.error]
export const selectAuth = (store) => store.auth
export const selectUser = (store) => store.auth.user // UNUSED ???
export const selectIsAuthenticated = (store) => store.auth.accessToken
export const selectAccessToken = (store) => store.auth.accessToken
export const selectRefreshToken = (store) => store.auth.refreshToken
