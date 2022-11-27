import { utils } from 'utility'

export default {
  // ==== Report ====

  // ** Report CRC
  getDataReportCRC: {
    path: '/rep_crc',
    method: 'POST'
  },
  downloadExcelReportCRC: {
    path: '/rep_crc/excel',
    method: 'POST'
  },

  // ** Report Order
  getDataReportOrder: (queryParams) => ({ // { page, limit }, all salesman
    path: `/rep_order?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelDataReportOrder: { // all salesman
    path: '/rep_order/all_salesman/excel',
    method: 'POST'
  },
  getDataReportOrderSalesman: (queryParams) => ({ // { page, limit }, get by salesmanid
    path: `/rep_order/all?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportOrderSalesman: {
    path: '/rep_order/all/excel',
    method: 'POST'
  },

  // ** Report Promo
  getDataReportPromo: {
    path: '/rep_promo',
    method: 'GET'
  },
  getReportPromoDetail: (queryParams) => ({ // { page, limit, search }
    path: `/rep_promo/detail?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelDataReportPromo: {
    path: '/rep_promo/detail/excel',
    method: 'POST'
  },

  // ** Report Competitor
  getDataReportCompetitor: (queryParams) => ({ // { page, limit, search }
    path: `/rep_competitor?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportCompetitor: {
    path: '/rep_competitor/excel',
    method: 'POST'
  },
  getDataReportCompetitorNPD: (queryParams) => ({ // { page, limit, search }
    path: `/rep_competitor/npd?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportCompetitorNPD: {
    path: '/rep_competitor/npd/excel',
    method: 'POST'
  },

  // ** Report SOS
  getDataReportSOS: (queryParams) => ({
    path: `/rep_sos?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportSOS: {
    path: '/rep_sos/excel',
    method: 'POST'
  },

  // ** Report Log
  getDataReportLog: (queryParams) => ({
    path: `/rep_log?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportLog: {
    path: '/rep_log/excel',
    method: 'POST'
  },

  // ** Report Dokumentasi
  getDataReportDokumentasi: (queryParams) => ({
    path: `/rep_dokumentasi?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportDokumentasi: {
    path: '/rep_dokumentasi/excel',
    method: 'POST'
  },
  downloadExcelReportDokumentasiOOS: {
    path: '/rep_dokumentasi/oos/excel',
    method: 'POST'
  },

  // ** Report DOI (Report Toko Panel)
  getDataReportDOI: (queryParams) => ({
    path: `/rep_doi?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportDOI: {
    path: '/rep_doi/excel',
    method: 'POST'
  },

  // ** Report Productivity
  getDataReportProductivity: (queryParams) => ({
    path: `/rep_productivity?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportProductivity: () => ({
    path: '/rep_productivity/excel',
    method: 'POST'
  }),

  // ** Report Visit FC
  getDataReportVisit: (queryParams) => ({
    path: `/rep_visit?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  getDataReportVisitMap: {
    path: '/rep_visit/map',
    method: 'POST'
  },

  // ** Report Top Rating
  getDataReportTopRating: (queryParams) => ({
    path: `/rep_top_rating?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),

  getReportTopRatingDetail: (queryParams) => ({
    path: `/rep_top_rating/detail?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  getReportTopRatingDetailContent: (queryParams) => ({
    path: `/rep_top_rating/detail_content?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportTopRating: (queryParams) => ({
    path: `/rep_top_rating/excel?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),

  // ** Report Rating
  getDataReportRating: (queryParams) => ({
    path: `/rep_rating?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  getReportRatingDetail: (queryParams) => ({
    path: `/rep_rating/detail?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  getReportRatingDetailContent: (queryParams) => ({
    path: `/rep_rating/detail_content?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),

  // ** Report GFF Aktif
  getDataReportGFFAktif: (queryParams) => ({
    path: `/rep_gffaktif?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  downloadExcelReportGFFAktif: {
    path: '/rep_gffaktif/excel',
    method: 'POST'
  },

  // ** Report Available MCS
  getDataReportAvailMCS: (queryParams) => ({
    path: `/rep_available_mcs?${ utils.generateQueryString(queryParams) }`,
    method: 'POST'
  }),
  getDataProductAvailMCS: {
    path: '/rep_available_mcs/productmcs',
    method: 'POST'
  },
  downloadExcelReportAvailMCS: {
    path: '/rep_available_mcs/excel',
    method: 'POST'
  }
}