import produce from 'immer'


const initialState = {
  jobType  : 'musicalReplacement',
  relations: ['instrument', 'user'],
  role     : ['guitar', 'drums', 'voice', 'bas', 'keys', 'sax', 'pandora', 'violin', 'trumpet', 'trombone'],
  date     : {
    from: null,
    to  : null,
  },
  salary   : {
    from: null,
    to  : null,
  },
  sets: '',
}

const filterReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'FILTER_INSTRUMENTS':
        draft.role = action.instrument
        break
      case 'FILTER_DATE':
        draft.date.from = action.from
        draft.date.to = action.to
        break
      case 'FILTER_SALARY':
        draft.salary.from = action.from
        draft.salary.to = action.to
        break
      case 'FILTER_SETS':
        draft.sets = action.sets
        break
      default:
        return state
    }
  })
}

export default filterReducer