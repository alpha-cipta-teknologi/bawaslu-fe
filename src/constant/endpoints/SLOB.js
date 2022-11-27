export default {
  // ==== Report SLOB ====
  getDataReportSLOBNational: {
    path: '/rep_return_detector/national',
    method: 'POST'
  },
  getDataReportSLOBRegional: {
    path: '/rep_return_detector/regional',
    method: 'POST'
  },
  getDataReportSLOBArea: {
    path: '/rep_return_detector/area',
    method: 'POST'
  },
  getDataReportSLOBSubarea: {
    path: '/rep_return_detector/subarea',
    method: 'POST'
  },
  downloadExcelReportSLOBSubarea: {
    path: '/rep_return_detector/slob_excel',
    method: 'POST'
  }
}