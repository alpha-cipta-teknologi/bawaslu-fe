import { api, utils } from 'utility'
import { endpoints } from 'constant'
import { lazyLoadStart, lazyLoadEnd } from 'store/actions/misc'

// ** Import action types
import {
  GET_DATA_FORUM_ARTICLE,
  GET_DATA_TRENDING_FORUM_ARTICLE,
  GET_DATA_COMMENT_FORUM_ARTICLE,
  UPDATE_COUNTER,
  GET_DATA_FORUM_ARTICLE_DETAIL
} from '../actionTypes'

/* eslint-disable no-unused-expressions */

// ** Get data on page or row change
export const getDataForumArticle = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataForumArticle,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data: { values, total } } = response

        dispatch({
          type: GET_DATA_FORUM_ARTICLE,
          data: {
            data: values && values.length ? values : [],
            total,
            page: queryParams.page || 1
          }
        })

        if (callback) callback(success, values)
      }
    },
    (response, dispatch) => {
      if (response.code === 404) {
        dispatch({
          type: GET_DATA_FORUM_ARTICLE,
          data: {
            data: [],
            total: 0,
            page: queryParams.page || 1
          }
        })
      }

      if (callback) callback(false, [])
    },
    dispatch => dispatch(lazyLoadStart('getDataForumArticle')),
    dispatch => dispatch(lazyLoadEnd('getDataForumArticle'))
  )
}

export const getDataForumArticleAuth = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataForumArticleAuth,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data: { values, total } } = response

        dispatch({
          type: GET_DATA_FORUM_ARTICLE,
          data: {
            data: values && values.length ? values : [],
            total,
            page: queryParams.page || 1
          }
        })

        if (callback) callback(success, values)
      }
    },
    (response, dispatch) => {
      if (response.code === 404) {
        dispatch({
          type: GET_DATA_FORUM_ARTICLE,
          data: {
            data: [],
            total: 0,
            page: queryParams.page || 1
          }
        })
      }

      if (callback) callback(false, [])
    },
    dispatch => dispatch(lazyLoadStart('getDataForumArticle')),
    dispatch => dispatch(lazyLoadEnd('getDataForumArticle'))
  )
}

export const getDataTrendingForumArticle = (callback = null) => {
  return api.request(
    endpoints.getDataTrendingForumArticle,
    null,
    (response, dispatch, success) => {
      if (success) {
        const data = response?.data || []

        dispatch({
          type: GET_DATA_TRENDING_FORUM_ARTICLE,
          data
        })

        if (callback) callback(success, data)
      }
    },
    (response, dispatch) => {
      if (response.code === 404) {
        dispatch({
          type: GET_DATA_TRENDING_FORUM_ARTICLE,
          data: []
        })
      }

      if (callback) callback(false, [])
    },
    dispatch => dispatch(lazyLoadStart('getDataTrendingForumArticle')),
    dispatch => dispatch(lazyLoadEnd('getDataTrendingForumArticle'))
  )
}

// ** Create Forum Article
export const createForumArticle = (formForum, callback = null) => {
  return api.request(
    endpoints.createForumArticle,
    formForum,
    (response, dispatch, success) => {
      if (success) {
        callback ? callback(success) : null
      }
    },
    () => {
      callback ? callback(false) : null
    },
    dispatch => dispatch(lazyLoadStart('createForumArticle')),
    dispatch => dispatch(lazyLoadEnd('createForumArticle'))
  )
}

// ** Save data Forum Article detail
export const getForumArticleDetail = (data, callback = null) => {
  return dispatch => {
    dispatch({
      type: GET_DATA_FORUM_ARTICLE_DETAIL,
      data
    })

    if (callback) callback(data)
  }
}

// ** Like Forum Article
export const likeForumArticle = (payload, callback = null) => {
  const formLike = utils.removeProperties(payload, 'reducer')

  return api.request(
    endpoints.likeForumArticle,
    formLike,
    (response, dispatch, success) => {
      if (success) {
        dispatch({
          type: UPDATE_COUNTER,
          data: {
            id: formLike.id,
            type: 'like',
            reducer: payload.reducer
          }
        })

        if (callback) callback(success)
      }
    },
    () => {
      callback ? callback(false) : null
    },
    dispatch => dispatch(lazyLoadStart('likeForumArticle')),
    dispatch => dispatch(lazyLoadEnd('likeForumArticle'))
  )
}

// ** Comment Forum Article
export const commentForumArticle = (payload, callback = null) => {
  const formComment = utils.removeProperties(payload, 'articleid', 'comment_type', 'reducer')

  return api.request(
    endpoints.commentForumArticle,
    formComment,
    (response, dispatch, success) => {
      if (success) {
        if (callback) callback(success)

        if (payload.articleid) {
          dispatch({
            type: UPDATE_COUNTER,
            data: {
              id: payload.articleid,
              type: 'comment',
              actionType: 'add',
              reducer: payload.reducer
            }
          })
        }
      }
    },
    () => {
      if (callback) callback(false)
    },
    dispatch => dispatch(lazyLoadStart(`commentForumArticle${payload.comment_type || ''}`)),
    dispatch => dispatch(lazyLoadEnd(`commentForumArticle${payload.comment_type || ''}`))
  )
}

// ** Show Comment Forum Article
export const getDataCommentForumArticle = (queryParams, callback = null) => {
  return api.request(
    endpoints.getDataCommentForumArticle,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        dispatch({
          type: GET_DATA_COMMENT_FORUM_ARTICLE,
          data: {
            id: queryParams.id_external,
            values: data?.values || [],
            total: data?.total || 0,
            page: queryParams.page
          }
        })

        if (callback) callback(data)
      }
    },
    (response, dispatch) => {
      if (response.code === 404) {
        dispatch({
          type: GET_DATA_COMMENT_FORUM_ARTICLE,
          data: {
            data: {
              id: queryParams.id_external,
              total: 0,
              values: [],
              page: queryParams.page
            }
          }
        })

        if (callback) {
          callback({
            total: 0,
            values: []
          })
        }
      }
    },
    dispatch => dispatch(lazyLoadStart('getDataCommentForumArticle')),
    dispatch => dispatch(lazyLoadEnd('getDataCommentForumArticle'))
  )
}

// ** Get Category Forum Article
export const getAllDataCategory = (queryParams, callback = null) => {
  return api.request(
    endpoints.getAllDataCategory,
    queryParams,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        callback ? callback(data) : null
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('getAllDataCategory')),
    dispatch => dispatch(lazyLoadEnd('getAllDataCategory'))
  )
}

// ** Delete Forum Article
export const deleteForumArticle = (id, callback = null) => {
  return api.request(
    endpoints.deleteForumArticle(id),
    null,
    (response, dispatch, success) => {
      if (success) {
        if (callback) callback()
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('deleteForumArticle')),
    dispatch => dispatch(lazyLoadEnd('deleteForumArticle'))
  )
}

// ** Delete Comment Article
export const deleteCommentArticle = (payload, callback = null) => {
  return api.request(
    endpoints.deleteCommentArticle(payload.id),
    null,
    (response, dispatch, success) => {
      if (success) {
        if (payload.group_comment === 1) {
          dispatch({
            type: UPDATE_COUNTER,
            data: {
              id: payload.articleid,
              type: 'comment',
              actionType: 'remove',
              reducer: payload.reducer
            }
          })
        }

        if (callback) callback()
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('deleteCommentArticle')),
    dispatch => dispatch(lazyLoadEnd('deleteCommentArticle'))
  )
}

export const counterViewShare = (payload, callback = null) => {
  const formCounter = {
    id: payload.id,
    group: payload.group,
    counter: payload.counter
  }

  return api.request(
    endpoints.counterViewShare,
    formCounter,
    (response, dispatch, success) => {
      if (success) {
        const { data } = response

        dispatch({
          type: UPDATE_COUNTER,
          data: {
            id: payload.id,
            type: payload.counter,
            reducer: payload.reducer
          }
        })

        if (callback) callback(data)
      }
    },
    null,
    dispatch => dispatch(lazyLoadStart('counterViewShare')),
    dispatch => dispatch(lazyLoadEnd('counterViewShare'))
  )
}