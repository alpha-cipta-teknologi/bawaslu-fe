export default {
  login: {
    path: '/auth/login',
    method: 'POST'
  },
  register: {
    path: '/auth/register',
    method: 'POST'
  },
  refreshToken: {
    path: '/auth/refresh-token',
    method: 'GET'
  },
  accountVerification: {
    path: '/auth/verify',
    method: 'GET'
  },
  forgotPassword: {
    path: '/auth/forgot-password',
    method: 'POST'
  },
  resetPassword: confirmHash => ({
    path: `/auth/reset-password?confirm_hash=${confirmHash}`,
    method: 'POST'
  }),
  // ** Profile
  getDataProfile: id => ({
    path: `/app/resource/${id}`,
    method: 'GET'
  }),
  updateProfile: id => ({
    path: `/app/resource/${id}`,
    method: 'PUT',
    type: 'form-data'
  })
}