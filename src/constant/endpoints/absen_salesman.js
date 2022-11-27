export default {
  // ==== Absen Salesman ====
  getDataAbsenSalesman: {
    path: '/ref_absen_salesman',
    method: 'GET'
  },
  getAbsenSalesmanDetail: {
    path: '/ref_absen_salesman/detail',
    method: 'POST'
  },
  actionAbsenSalesman: {
    path: '/ref_absen_salesman/action',
    method: 'POST',
    type: 'form-data'
  },
  deleteAbsenSalesman: {
    path: '/ref_absen_salesman/delete',
    method: 'POST'
  }
}