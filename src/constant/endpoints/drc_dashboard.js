export default {
  // ==== Man Power ====
  getDataManPowerNational: {
    path: '/drc_dashboard/open_detail_national',
    method: 'POST'
  },
  // ** Fulfillment
  getDataFulfillmentRegional: {
    path: '/drc_dashboard/open_hc_detail_regional',
    method: 'POST'
  },
  getDataFulfillmentArea: {
    path: '/drc_dashboard/open_hc_detail_regional_area',
    method: 'POST'
  },
  getDataFulfillmentSubarea: {
    path: '/drc_dashboard/open_hc_detail_regional_area_city',
    method: 'POST'
  },
  getDataFulfillmentGFF: {
    path: '/drc_dashboard/open_hc_detail_regional_area_city_gff',
    method: 'POST'
  },
  // ** Absensi
  getDataAbsensiRegional: {
    path: '/drc_dashboard/open_att_detail_regional',
    method: 'POST'
  },
  getDataAbsensiArea: {
    path: '/drc_dashboard/open_att_detail_regional_area',
    method: 'POST'
  },
  getDataAbsensiSubarea: {
    path: '/drc_dashboard/open_att_detail_regional_area_city',
    method: 'POST'
  },
  getDataAbsensiGFF: {
    path: '/drc_dashboard/open_att_detail_regional_area_city_gff',
    method: 'POST'
  },
  downloadExcelAbsensiDetailGFF: {
    path: '/drc_dashboard/absensi_detail_excel',
    method: 'POST'
  },
  // ** Actual Call
  getDataActCallRegional: {
    path: '/drc_dashboard/open_act_call_detail_regional',
    method: 'POST'
  },
  getDataActCallArea: {
    path: '/drc_dashboard/open_act_call_detail_regional_area',
    method: 'POST'
  },
  getDataActCallSubarea: {
    path: '/drc_dashboard/open_act_call_detail_regional_area_city',
    method: 'POST'
  },
  getDataActCallGFF: {
    path: '/drc_dashboard/open_act_call_detail_regional_area_city_gff',
    method: 'POST'
  },
  downloadExcelActCallNational: {
    path: '/drc_dashboard/actual_call_national_excel',
    method: 'POST'
  },
  downloadExcelActCallSubarea: {
    path: '/drc_dashboard/actual_call_city_excel',
    method: 'POST'
  },
  downloadExcelActCallGFF: {
    path: '/drc_dashboard/actual_call_city_gff_excel',
    method: 'POST'
  },

  // ==== Product Availability ====
  getDataProductAvailNational: {
    path: '/drc_dashboard/open_detail_product_available_national',
    method: 'POST'
  },
  downloadExcelProductAvailNational: {
    path: '/drc_dashboard/product_availability_national_excel',
    method: 'POST'
  },
  getDataProductAvailArea: {
    path: '/drc_dashboard/open_brand_detail_product_available_regional_area',
    method: 'POST'
  },
  getDataProductAvailSubarea: {
    path: '/drc_dashboard/open_brand_detail_product_available_regional_area_city',
    method: 'POST'
  },
  downloadExcelProductAvailSubarea: {
    path: '/drc_dashboard/product_availability_city_excel',
    method: 'POST'
  },

  // ==== SOS ====
  getDataSOSNational: {
    path: '/drc_dashboard/open_detail_sos_national',
    method: 'POST'
  },
  downloadExcelSOSNational: {
    path: '/drc_dashboard/sos_national_excel',
    method: 'POST'
  },
  getDataSOSArea: {
    path: '/drc_dashboard/open_detail_sos_regional_area',
    method: 'POST'
  },
  getDataSOSSubarea: {
    path: '/drc_dashboard/open_detail_sos_regional_area_city',
    method: 'POST'
  },
  downloadExcelSOSSubarea: {
    path: '/drc_dashboard/sos_by_city_excel',
    method: 'POST'
  },
  getDataSOSSubareaOutlet: {
    path: '/drc_dashboard/open_detail_sos_regional_area_city_outlet',
    method: 'POST'
  },

  // ==== SLOB ====
  getDataSLOBNational: {
    path: '/drc_dashboard/open_detail_slob_national',
    method: 'POST'
  },
  getDataSLOBRegional: {
    path: '/drc_dashboard/open_detail_slob_regional',
    method: 'POST'
  },
  getDataSLOBArea: {
    path: '/drc_dashboard/open_detail_slob_regional_area',
    method: 'POST'
  },
  getDataSLOBSubarea: {
    path: '/drc_dashboard/open_detail_slob_regional_area_city',
    method: 'POST'
  },
  downloadExcelSLOBSubarea: {
    path: '/drc_dashboard/slob_by_city_excel',
    method: 'POST'
  }
}