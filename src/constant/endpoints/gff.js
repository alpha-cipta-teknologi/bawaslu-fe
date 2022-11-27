export default {
  // ==== GFF ====

  // ** Data GFF (Salesman)
  getDataSalesman: {
    path: '/sales_salesman',
    method: 'GET'
  },
  getSalesmanDetail: {
    path: '/sales_salesman/detail',
    method: 'POST'
  },
  actionSalesman: {
    path: '/sales_salesman/action',
    method: 'POST'
  },
  deleteSalesman: {
    path: '/sales_salesman/delete',
    method: 'POST'
  },

  // ** Quota Budget
  getAllDataQuotaBudget: {
    path: '/quota_budget/detail',
    method: 'GET'
  },
  actionQuotaBudget: {
    path: '/quota_budget/action',
    method: 'POST'
  }
}