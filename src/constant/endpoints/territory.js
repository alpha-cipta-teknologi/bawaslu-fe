export default {
  // ==== Territory ====
  // ** Regional
  getDataRegional: {
    path: '/area_regional',
    method: 'GET'
  },
  getRegionalDetail: regionalId => ({
    path: `/area_regional/${ regionalId }`,
    method: 'GET'
  }),
  actionRegional: {
    path: '/area_regional/action',
    method: 'POST'
  },
  deleteRegional: {
    path: '/area_regional/delete',
    method: 'POST'
  },

  // ** Area site
  getDataArea: {
    path: '/area_site',
    method: 'GET'
  },
  getDataAreaByMultiRegional: {
    path: '/area_site/multi-regional',
    method: 'POST'
  },
  getAreaDetail: areaId => ({
    path: `/area_site/${ areaId }`,
    method: 'GET'
  }),
  actionArea: {
    path: '/area_site/action',
    method: 'POST'
  },
  deleteArea: {
    path: '/area_site/delete',
    method: 'POST'
  },

  // ** Sub Area site
  getDataSubarea: {
    path: '/sub_area',
    method: 'GET'
  },
  getDataSubareaByMultiArea: {
    path: '/sub_area/multi-area',
    method: 'POST'
  },
  getDataSubareaByRegional: regionalId => ({
    path: `/sub_area/regional/${ regionalId }`,
    method: 'GET'
  }),
  getSubareaDetail: subareaId => ({
    path: `/sub_area/${ subareaId }`,
    method: 'GET'
  }),
  actionSubarea: {
    path: '/sub_area/action',
    method: 'POST'
  },
  deleteSubarea: {
    path: '/sub_area/delete',
    method: 'POST'
  },

  // ** Propinsi
  getDataPropinsi: {
    path: '/area_propinsi',
    method: 'GET'
  },
  getPropinsiDetail: propinsiId => ({
    path: `/area_propinsi/${ propinsiId }`,
    method: 'GET'
  }),
  actionPropinsi: {
    path: '/area_propinsi/action',
    method: 'POST'
  },
  deletePropinsi: {
    path: '/area_propinsi/delete',
    method: 'POST'
  },

  // ** Kota
  getDataKota: {
    path: '/area_kota',
    method: 'GET'
  },
  getDataKotaByPropinsi: propinsiId => ({
    path: `/area_kota/propinsi/${ propinsiId }`,
    method: 'GET'
  }),
  getKotaDetail: kotaId => ({
    path: `/area_kota/${ kotaId }`,
    method: 'GET'
  }),
  actionKota: {
    path: '/area_kota/action',
    method: 'POST'
  },
  deleteKota: {
    path: '/area_kota/delete',
    method: 'POST'
  },

  // ** Kecamatan
  getDataKecamatan: {
    path: '/area_kecamatan',
    method: 'GET'
  },
  getDataKecamatanByKota: kotaId => ({
    path: `/area_kecamatan/kota/${ kotaId }`,
    method: 'GET'
  }),
  getKecamatanDetail: kecamatanId => ({
    path: `/area_kecamatan/${ kecamatanId }`,
    method: 'GET'
  }),
  actionKecamatan: {
    path: '/area_kecamatan/action',
    method: 'POST'
  },
  deleteKecamatan: {
    path: '/area_kecamatan/delete',
    method: 'POST'
  },

  // ** Kelurahan
  getDataKelurahan: {
    path: '/area_kelurahan',
    method: 'GET'
  },
  getDataKelurahanByKecamatan: kecamatanId => ({
    path: `/area_kelurahan/kecamatan/${ kecamatanId }`,
    method: 'GET'
  }),
  getKelurahanDetail: kelurahanId => ({
    path: `/area_kelurahan/${ kelurahanId }`,
    method: 'GET'
  }),
  actionKelurahan: {
    path: '/area_kelurahan/action',
    method: 'POST'
  },
  deleteKelurahan: {
    path: '/area_kelurahan/delete',
    method: 'POST'
  }
}