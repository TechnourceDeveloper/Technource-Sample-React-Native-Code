import {actionTypes} from '../actions/auth'
const initialState = {
   isLoggedIn: false,
}

const reducer = (state = initialState, {type}) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...initialState
      }

    default:
      return state;
  }
}

export default reducer
