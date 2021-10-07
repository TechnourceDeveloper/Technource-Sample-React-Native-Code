export const actionTypes = {
  SET_STAGE: 'SET_STAGE',
}

export const setStage = stage => {
  return {
    type: actionTypes.SET_STAGE,
    stage,
  }
}
