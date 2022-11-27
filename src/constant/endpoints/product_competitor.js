export default {
  // ==== Product Competitor ====
  getDataProductCompetitor: {
    path: '/ref_product_competitor',
    method: 'GET'
  },
  getProductCompetitorDetail: productid => ({
    path: `/ref_product_competitor/${ productid }`,
    method: 'GET'
  }),
  actionProductCompetitor: {
    path: '/ref_product_competitor/action',
    method: 'POST'
  },
  deleteProductCompetitor: {
    path: '/ref_product_competitor/delete',
    method: 'POST'
  }
}