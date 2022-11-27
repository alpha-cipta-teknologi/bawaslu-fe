export default {
  login: {
    path: '/auth/login',
    method: 'POST'
  },
  refreshToken: {
    path: '/auth/refresh-token',
    method: 'GET'
  },
  changePassword: {
    path: '/users/change_password',
    method: 'POST'
  },
  // ** Profile
  getDataProfile: {
    path: '/users/profile',
    method: 'GET'
  }
}