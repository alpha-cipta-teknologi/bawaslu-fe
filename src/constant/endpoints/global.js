export default {
  // ==== Global ====
  getDataForumArticle: {
    path: '/fe/article',
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
  }
}