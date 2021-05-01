import { createSlice } from '@reduxjs/toolkit'
import loadExtraReducers from './utils/load-extra-reducers'
import { fetchOffers, makeOffer } from '../actions/offers'
import { addDays } from '../../utils/date'


const fulfilledReducer = (state, action) => {
  state.isFetchedAll = !action.payload.length
  state.data = [...new Set([...state.data, ...action.payload])]
}

const offersSlice = createSlice({
  name         : 'offers',
  initialState : {
    fetchOffersBody: {
      where  : {
        jobType: 'musicalReplacement',
        role   : [],
        date   : {
          from: Number(new Date().setHours(20, 0, 0)),
          to  : Number(addDays(Date.now(), 365))
        },
        salary : {
          from: 0,
          to  : 999999999,
        },
        sets   : '',
      },
      limit  : 30,
      offset : 0,
      orderBy: undefined,
    },
    fetchedOffers  : { data: [] },
    madeOffer      : {},
  },
  reducers     : {
    incrementOffSet(state, action) {
      state.fetchOffersBody.offset = action.payload
    },
    fetchedOffersCleanUp(state) {
      state.fetchedOffers.data = []
      state.fetchedOffers.loading = true
      state.fetchedOffers.loaded = false
      state.fetchedOffers.error = null
    },
    sortOffers(state, action) {
      const type = action.payload.sortType
      const param = action.payload.param

      state.fetchOffersBody.offset = 0
      state.fetchOffersBody.orderBy = `${param} ${type}`
    },
    filterInstruments(state, action) {
      state.fetchOffersBody.offset = 0

      if (action.payload.filter === 'add') {
        state.fetchOffersBody.where.role.push(action.payload.instrument)
      } else {
        state.fetchOffersBody.where.role = state.fetchOffersBody.where.role.filter(instrument => instrument !== action.payload.instrument)
      }
    },
    filterDate(state, action) {
      state.fetchOffersBody.where.date.from = Number(action.payload.from)
      state.fetchOffersBody.where.date.to = Number(action.payload.to)
    },
    filterSalary(state, action) {
      state.fetchOffersBody.where.salary[action.payload.range] = Number(action.payload.value)
    },
    filterSets(state, action) {
      state.fetchOffersBody.where.sets = action.payload
    }
  },
  extraReducers: {
    ...loadExtraReducers(makeOffer, { context: 'madeOffer' }),
    ...loadExtraReducers(fetchOffers, { context: 'fetchedOffers', fulfilledReducer }),
  }
})

export default offersSlice.reducer

export const selectMadeOffer = state => state.offers.madeOffer
export const selectOfferBody = state => state.offers.fetchOffersBody
export const selectSalary = state => state.offers.fetchOffersBody.where.salary
export const selectInstrumentsList = state => state.offers.fetchOffersBody.where.role
export const selectOffers = state => state.offers.fetchedOffers
export const selectFetchedData = state => state.offers.fetchedOffers.data
export const {
  incrementOffSet,
  fetchedOffersCleanUp,
  sortOffers,
  filterInstruments,
  filterSalary,
  filterSets,
  filterDate,
} = offersSlice.actions