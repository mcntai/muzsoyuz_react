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

      state.fetchedOffers.data = state.fetchedOffers.data.sort(function(a, b) {
        return type === 'ASC' ? a[param] - b[param] : b[param] - a[param]
      })
    },
    filterInstruments(state, action) {
      state.fetchedOffers.data = []

      if (action.payload.add) {
        state.fetchOffersBody['instrument.name'].push(action.payload.instrument)
      } else {
        state.fetchOffersBody['instrument.name'] = state.fetchOffersBody['instrument.name'].filter(instrument => instrument !== action.payload.instrument )
      }
    },
    filterSalary(state, action) {
      console.log(action.payload)
      state.fetchOffersBody.salary[action.payload.range] = action.payload.value
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
export const { incrementOffSet, sortOffers, filterInstruments, filterSalary } = offersSlice.actions