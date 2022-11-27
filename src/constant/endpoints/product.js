export default {
  // ==== Product ====
  getDataProduct: {
    path: '/ref_product',
    method: 'GET'
  },
  getProductDetail: productid => ({
    path: `/ref_product/${ productid }`,
    method: 'GET'
  }),
  getProductListByBrandId: brandid => ({
    path: `/m_product/brand/${ brandid }`,
    method: 'GET'
  }),
  actionProduct: {
    path: '/ref_product/action',
    method: 'POST'
  },
  deleteProduct: {
    path: '/ref_product/delete',
    method: 'POST'
  }
}