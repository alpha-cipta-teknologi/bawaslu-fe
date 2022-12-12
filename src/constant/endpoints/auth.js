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
  updateProfile: id => ({
    path: `/app/resource/${id}`,
    method: 'PUT',
    type: 'form-data'
  }),
  // ** Profile
  getDataProfile: id => ({
    path: `/app/resource/${id}`,
    method: 'GET'
  })
}