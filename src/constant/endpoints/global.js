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
  getDataBawasluUpdate: {
    path: '/fe/bawaslu-update',
    method: 'GET'
  },
  getBawasluUpdateDetail: slug => ({
    path: `/fe/bawaslu-update/${slug}`,
    method: 'GET'
  }),
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
  }
}