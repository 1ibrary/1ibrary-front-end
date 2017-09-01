import { createAction, handleActions } from 'redux-actions'
import { SUBSCRIBE } from '../../network/Urls'
import HttpUtils from '../../network/HttpUtils'

const FETCH_SUBSCRIBE_SUCCESS = 'FETCH_SUBSCRIBE_SUCCESS'

const initialState = {
  books: []
}

export const fetchSubscribe = () => {
  return async (dispatch) => {
    const result = await HttpUtils.post(SUBSCRIBE.get_subscribe, {})

    if (result.status !== 0) {
      return
    }

    dispatch(fetchSubscribeBookSuccess(result.books))
  }
}

const fetchSubscribeBookSuccess = createAction(FETCH_SUBSCRIBE_SUCCESS)

export default subscribeReducer = handleActions({
  [FETCH_SUBSCRIBE_SUCCESS](state, action) {
    return {
      ...state,
      books: action.payload
    }
  }
}, initialState)
