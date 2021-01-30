import produce from 'immer'
import moment from 'moment'

const initialState = {
  jobType  : 'musicalReplacement',
  relations: ['instrument', 'user'],
  "instrument.name": [],
  date     : {
    from: new Date(),
    to: moment().add(365, 'days')
  },
  salary   : {
    from: null,
    to  : null,
  },
  sets: '',
  limit: 30,
  offset: null,
}

const filterReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'FILTER_INSTRUMENTS':
        draft["instrument.name"] = action.instrument
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
        draft.sets = Number(action.sets)
        break
      case 'SORT_DESC':
        draft.orderBy = action.param
        break
      case 'SORT_ASC':
        draft.orderBy = action.param
        break
      default:
        return state
    }
  })
}

export default filterReducer