export default {
  // ==== SKU Active ====
  getDataSkuActive: {
    path: '/mapping_sku_active',
    method: 'GET'
  },
  getSkuActiveDetail: idaccount => ({
    path: `/mapping_sku_active/${ idaccount }`,
    method: 'GET'
  }),
  actionSkuActive: {
    path: '/mapping_sku_active/action',
    method: 'POST'
  },
  deleteSkuActive: {
    path: '/mapping_sku_active/delete',
    method: 'POST'
  }
}