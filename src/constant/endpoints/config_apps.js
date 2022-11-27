export default {
  // ==== Configuration Apps ====
  // ** Setup Site
  getDataSetupSite: {
    path: '/setup_site',
    method: 'GET'
  },
  getSetupSiteDetail: siteId => ({
    path: `/setup_site/${ siteId }`,
    method: 'GET'
  }),
  actionSetupSite: {
    path: '/setup_site/action',
    method: 'POST'
  },
  deleteSetupSite: {
    path: '/setup_site/delete',
    method: 'POST'
  },

  // ** Bank 
  getDataBank: {
    path: '/ref_bank',
    method: 'GET'
  },
  getBankDetail: bankId => ({
    path: `/ref_bank/${ bankId }`,
    method: 'GET'
  }),
  actionBank: {
    path: '/ref_bank/action',
    method: 'POST'
  },
  deleteBank: {
    path: '/ref_bank/delete',
    method: 'POST'
  }
}