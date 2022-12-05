import { api } from 'utility'
import { endpoints } from 'constant'
import {
  lazyLoadStart,
  lazyLoadEnd,
  setProgress
} from 'store/actions/misc'

// ** Import action types
import {
  GET_DATA_FORUM_ARTICLE
} from '../actionTypes'

/* eslint-disable no-unused-expressions */

// ** Get data on page or row change
export const getDataForumArticle = (queryParams, callback = null) => {
    return api.request(
      endpoints.getDataForumArticle,
      queryParams,
      (response, dispatch, success) => {
        if (success) {
          const { data: {values, total} } = response

          dispatch({
            type: GET_DATA_FORUM_ARTICLE,
            data: {
              data: values && values.length ? values : [],
              total
            }
          })

          callback ? callback(values) : null
        }
      },
      null,
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
          const { data: {values, total} } = response

          dispatch({
            type: GET_DATA_FORUM_ARTICLE,
            data: {
              data: values && values.length ? values : [],
              total
            }
          })

          callback ? callback(values) : null
        }
      },
      null,
      dispatch => dispatch(lazyLoadStart('getDataForumArticle')),
      dispatch => dispatch(lazyLoadEnd('getDataForumArticle'))
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

// ** Like Forum Article
export const likeForumArticle = (formLike, callback = null) => {
    return api.request(
      endpoints.likeForumArticle,
      formLike,
      (response, dispatch, success) => {
        if (success) {
          callback ? callback(success) : null
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
export const commentForumArticle = (formComment, callback = null) => {
    return api.request(
      endpoints.commentForumArticle,
      formComment,
      (response, dispatch, success) => {
        if (success) {
          callback ? callback(success) : null
        }
      },
      () => {
        callback ? callback(false) : null
      },
      dispatch => dispatch(lazyLoadStart('commentForumArticle')),
      dispatch => dispatch(lazyLoadEnd('commentForumArticle'))
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

        callback ? callback(data) : null
      }
    },
    null,
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