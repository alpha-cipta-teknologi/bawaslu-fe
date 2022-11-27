export default {
  // ==== Brand Product ====
  getDataBrand: {
    path: '/ref_brand',
    method: 'GET'
  },
  getBrandDetail: brandid => ({
    path: `/ref_brand/${ brandid }`,
    method: 'GET'
  }),
  actionBrand: {
    path: '/ref_brand/action',
    method: 'POST'
  },
  deleteBrand: {
    path: '/ref_brand/delete',
    method: 'POST'
  }
}