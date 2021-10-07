import {actionTypes} from '../actions/stage'
import {USER_STAGE} from '../../config'

const initialState = {
  currentStage: USER_STAGE.CHOOSE_LANGUAGE,
}

const reducer = (state = initialState, {type, stage}) => {
  switch (type) {
    case actionTypes.SET_STAGE:
      return {
        ...state,
        currentStage: stage,
      }
    default:
      return state
  }
}

export default reducer
