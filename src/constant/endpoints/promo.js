export default {
  getDataPromoActive: {
    path: '/mapping_promo_active',
    method: 'GET'
  },
  getPromoActiveDetail: promoId => ({
    path: `/mapping_promo_active/${ promoId }`,
    method: 'GET'
  }),
  actionPromoActive: {
    path: '/mapping_promo_active/action',
    method: 'POST'
  },
  deletePromoActive: {
    path: '/mapping_promo_active/delete',
    method: 'POST'
  },

  // === Param Global ===
  getDataPromoType: {
    path: '/param_global/detail?search_by=key_param&keyword=key_tipe_promo',
    method: 'GET'
  }
}