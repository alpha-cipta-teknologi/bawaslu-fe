export default {
  // ==== Request New Outlet ====
  getDataReqNewOutlet: {
    path: '/ref_request_new_outlet',
    method: 'GET'
  },
  getReqNewOutletDetail: restrictLevel => ({
    path: `/ref_request_new_outlet/detail?restrict_level=${ restrictLevel }`,
    method: 'POST'
  }),
  actionReqNewOutlet: {
    path: '/ref_request_new_outlet/action',
    method: 'POST'
  },
  deleteReqNewOutlet: {
    path: '/ref_request_new_outlet/delete',
    method: 'POST'
  }
}