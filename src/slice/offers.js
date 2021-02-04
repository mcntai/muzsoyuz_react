import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { fetchOffers, makeOffer } from '../actions/offers'
import moment from 'moment'


const fulfilledReducer = (state, action) => {
  state.isFetchedAll = !action.payload.length
  state.data = [...new Set([...state.data, ...action.payload])]
}

const offersSlice = createSlice({
  name         : 'offers',
  initialState : {
    fetchOffersBody: {
      jobType          : 'musicalReplacement',
      relations        : ['instrument', 'user'],
      'instrument.name': [],
      date             : {
        from: new Date(),
        to  : moment().add(365, 'days')
      },
      salary           : {
        from: '',
        to  : '',
      },
      sets             : '',
      limit            : 30,
      offset           : 0,
      orderBy          : '',
    },
    fetchedOffers  : { data: [] },
    madeOffer      : {},
  },
  reducers     : {
    incrementOffSet(state, action) {
      state.fetchOffersBody.offset = action.payload
    },
    sortOffers(state, action) {
      let type = action.payload.sortType
      let param = action.payload.param

      state.fetchedOffers.data = []
      state.fetchOffersBody.offset = 0
      state.fetchOffersBody.orderBy = `${param} ${type}`
    },
    filterInstruments(state, action) {
      state.fetchedOffers.data = []
      state.fetchOffersBody.offset = 0

      if (action.payload.add) {
        state.fetchOffersBody['instrument.name'].push(action.payload.instrument)
      } else {
        state.fetchOffersBody['instrument.name'] = state.fetchOffersBody['instrument.name'].filter(instrument => instrument !== action.payload.instrument)
      }
    },
    filterDate(state, action) {
      state.fetchedOffers.data = []
      state.fetchOffersBody.date.from = action.payload.from
      state.fetchOffersBody.date.to = action.payload.to
    },
    filterSalary(state, action) {
      state.fetchedOffers.data = []
      state.fetchOffersBody.salary[action.payload.range] = action.payload.value
    },
    filterSets(state, action) {
      state.fetchedOffers.data = []
      state.fetchOffersBody.sets = action.payload
    }
  },
  extraReducers: {
    ...loadExtraReducers(makeOffer, { context: 'madeOffer' }),
    ...loadExtraReducers(fetchOffers, { context: 'fetchedOffers', fulfilledReducer }),
  }
})

export default offersSlice.reducer

export const selectOfferBody = state => state.offers.fetchOffersBody
export const selectSalary = state => state.offers.fetchOffersBody.salary
export const selectInstrumentsList = state => state.offers.fetchOffersBody['instrument.name']
export const selectFetchedOffers = state => state.offers.fetchedOffers
export const {
  incrementOffSet,
  sortOffers,
  filterInstruments,
  filterSalary,
  filterSets,
  filterDate,
} = offersSlice.actions