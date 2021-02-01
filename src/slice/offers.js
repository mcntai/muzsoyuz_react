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
        from: null,
        to  : null,
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
    }
  },
  extraReducers: {
    ...loadExtraReducers(makeOffer, { context: 'madeOffer' }),
    ...loadExtraReducers(fetchOffers, { context: 'fetchedOffers', fulfilledReducer }),
  }
})

export default offersSlice.reducer

export const selectOfferBody = state => state.offers.fetchOffersBody
export const selectFetchedOffers = state => state.offers.fetchedOffers
export const { incrementOffSet } = offersSlice.actions