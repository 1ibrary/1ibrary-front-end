import { createAction, handleActions } from 'redux-actions'
import { BOOKS, SUBSCRIBE } from '../../network/Urls'
import HttpUtils from '../../network/HttpUtils'

const FETCH_RENT_SUCCESS = 'FETCH_RENT_SUCCESS'

const initialState = {
  books: []
}

export const fetchRentBooks = () => {
  return async (dispatch) => {
    const result = await HttpUtils.post(BOOKS.borrowed, {})

    if (result.status !== 0) {
      return
    }

    dispatch(fetchRentBooksSuccess(result.books))
  }
}

const fetchRentBooksSuccess = createAction(FETCH_RENT_SUCCESS)

export default rentReducer = handleActions({
  [FETCH_RENT_SUCCESS](state, action) {
    return {
      ...state,
      books: action.payload
    }
  }
}, initialState)
