import { fetchSubscribe } from './subscribe'
import { fetchRentBooks } from './rent'

export default function initApp () {
  return (dispatch) => {
    dispatch(fetchSubscribe())
    dispatch(fetchRentBooks())
  }
}
