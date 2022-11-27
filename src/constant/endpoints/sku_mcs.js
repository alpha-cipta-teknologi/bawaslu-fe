export default {
  // ==== Must Carry SKU ====
  getDataSkuMcs: {
    path: '/mapping_sku_mcs',
    method: 'GET'
  },
  getSkuMcsDetail: typeid => ({
    path: `/mapping_sku_mcs/${ typeid }`,
    method: 'GET'
  }),
  actionSkuMcs: {
    path: '/mapping_sku_mcs/action',
    method: 'POST'
  },
  deleteSkuMcs: {
    path: '/mapping_sku_mcs/delete',
    method: 'POST'
  }
}