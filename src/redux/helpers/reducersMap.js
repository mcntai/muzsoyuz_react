import produce from "immer"

const reducersMap = (map, initialState = {}) => (state = initialState, action) => {
  const reducer = map[action.type]

  return produce(state, draft => reducer ? reducer(draft, action) : draft)
}

export default reducersMap