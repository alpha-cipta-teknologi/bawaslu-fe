export default {
  // ==== Global ====
  getDataForumArticle: {
    path: '/fe/article',
    method: 'GET'
  },
  getDataForumArticleAuth: {
    path: '/forum/article',
    method: 'GET'
  },
  getForumArticleDetailAuth: slug => ({
    path: `/forum/article/${slug}`,
    method: 'GET'
  }),
  getDataTrendingForumArticle: {
    path: '/fe/trending-article',
    method: 'GET'
  },
  createForumArticle: {
    path: '/forum/article',
    method: 'POST',
    type: 'form-data'
  },
  likeForumArticle: {
    path: '/forum/like',
    method: 'POST'
  },
  commentForumArticle: {
    path: '/forum/comment',
    method: 'POST'
  },
  getDataCommentForumArticle: {
    path: '/fe/comment',
    method: 'GET'
  },
  deleteForumArticle: id => ({
    path: `/forum/article/${id}`,
    method: 'DELETE'
  }),
  deleteCommentArticle: commentId => ({
    path: `/forum/comment/${commentId}`,
    method: 'DELETE'
  }),
  getDataBawasluUpdate: {
    path: '/fe/bawaslu-update',
    method: 'GET'
  },
  getBawasluUpdateDetail: slug => ({
    path: `/fe/bawaslu-update/${slug}`,
    method: 'GET'
  }),
  getBawasluUpdateDetailAuth: slug => ({
    path: `/forum/bawaslu-update/${slug}`,
    method: 'GET'
  }),
  counterViewShare: {
    path: '/forum/counter',
    method: 'POST'
  },
  getDataGallery: {
    path: '/fe/gallery',
    method: 'GET'
  },
  getAllDataCategory: {
    path: '/reff/category/all-data',
    method: 'GET'
  },
  getDataContentHome: {
    path: '/fe/content',
    method: 'GET'
  },
  getDataProvinces: {
    path: '/area/province',
    method: 'GET'
  },
  getDataRegencies: {
    path: '/area/regency',
    method: 'GET'
  },
  getDataRegenciesByProvince: provinceId => ({
    path: `/area/regency/${provinceId}`,
    method: 'GET'
  }),

  // Notification
  getDataNotification: {
    path: '/notif',
    method: 'GET'
  },
  readNotification: notifId => ({
    path: `/notif/${notifId}`,
    method: 'PUT'
  }),

  // Komunitas
  getAllDataCommunity: {
    path: '/reff/komunitas/all-data',
    method: 'GET'
  },

  // Tema
  getAllDataTopic: {
    path: '/reff/tema/all-data',
    method: 'GET'
  },

  // Hasil cek fakta
  getDataFactCheck: {
    path: '/fe/factcheck',
    method: 'GET'
  }
}