const errorsReducer = (state = null, action) => {
  const { type, error } = action
  if (type.endsWith('rejected')) {
    return error.message
  } else if (type === 'CLEAR_ERROR') {
    return null
  } else {
    return state
  }
}

export const selectError = state => state.errors
export default errorsReducer