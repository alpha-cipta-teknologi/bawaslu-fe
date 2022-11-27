export default {
  // ==== Outlet ====

  // ** Data Outlet
  getDataOutlet: {
    path: '/customer',
    method: 'GET'
  },
  getDataOutletByClassid: classid => ({
    path: `/customer/classid/${ classid }`,
    method: 'GET'
  }),
  getDataOutletDetail: customerId => ({
    path: `/customer/${ customerId }`,
    method: 'GET'
  }),
  actionDataOutlet: {
    path: '/customer/action',
    method: 'POST'
  },
  deleteDataOutlet: {
    path: '/customer/delete',
    method: 'POST'
  },
  downloadExcelDataOutlet: {
    path: '/customer/excel',
    method: 'GET'
  },

  // ** Outlet Spot
  getDataSpotOutlet: {
    path: '/customer_spot',
    method: 'GET'
  },
  getSpotOutletDetail: custId => ({
    path: `/customer_spot/${ custId }`,
    method: 'GET'
  }),

  // ** Outlet Channel
  getDataOutletChannel: {
    path: '/customer_type',
    method: 'GET'
  },
  getOutletChannelDetail: typeId => ({
    path: `/customer_type/${ typeId }`,
    method: 'GET'
  }),
  actionOutletChannel: {
    path: '/customer_type/action',
    method: 'POST'
  },
  deleteOutletChannel: {
    path: '/customer_type/delete',
    method: 'POST'
  },

  // ** Business Unit
  getDataBusinessUnit: {
    path: '/customer_segment',
    method: 'GET'
  },
  getBusinessUnitDetail: segmentId => ({
    path: `/customer_segment/${ segmentId }`,
    method: 'GET'
  }),
  actionBusinessUnit: {
    path: '/customer_segment/action',
    method: 'POST'
  },
  deleteBusinessUnit: {
    path: '/customer_segment/delete',
    method: 'POST'
  },

  // ** Account Outlet
  getDataAccountOutlet: {
    path: '/customer_class',
    method: 'GET'
  },
  getAccountOutletDetail: classId => ({
    path: `/customer_class/${ classId }`,
    method: 'GET'
  }),
  actionAccountOutlet: {
    path: '/customer_class/action',
    method: 'POST'
  },
  deleteAccountOutlet: {
    path: '/customer_class/delete',
    method: 'POST'
  },

  // ** Setup PJP
  getDataSetupPJP: {
    path: '/setup_pjp',
    method: 'GET'
  },
  createSetupPJP: {
    path: '/setup_pjp/create',
    method: 'POST'
  },
  updateSetupPJP: {
    path: '/setup_pjp/update',
    method: 'POST'
  },
  deleteSetupPJP: {
    path: '/setup_pjp/delete',
    method: 'POST'
  },
  downloadExcelSetupPJP: {
    path: '/setup_pjp/excel',
    method: 'GET'
  },
  uploadExcelSetupPJP: {
    path: '/setup_pjp/upload-excel',
    method: 'POST',
    type: 'form-data'
  },
  getDataSalesmanPJP: {
    path: '/setup_pjp/get_salesman',
    method: 'GET'
  },
  getDataOutletPJP: salesmanId => ({
    path: `/setup_pjp/get_outlet_pjp?salesmanid=${ salesmanId }`,
    method: 'GET'
  }),
  getDataTipeSalesman: () => ({
    path: '/setup_pjp/get_tipesalesman',
    method: 'GET'
  }),

  // ** Rekap PJP (Report Sales)
  getDataReportSales: salesmanId => ({
    path: `/report_sales_pjp/${ salesmanId }`,
    method: 'GET'
  }),
  downloadExcelRekapPJP: salesmanId => ({
    path: `/report_sales_pjp/excel/${ salesmanId }`,
    method: 'GET'
  })
}