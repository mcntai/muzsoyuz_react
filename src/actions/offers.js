import { createAsyncThunk } from '@reduxjs/toolkit'
import { ACTION_PREFIXES as p } from '../constants/action-types'


export const makeOffer = createAsyncThunk(
  p.OFFER_MAKE,
  ({ body }, thunkAPI) => thunkAPI.extra.api.makeJobOffer(body),
)

export const fetchOffers = createAsyncThunk(
  p.OFFER_FETCH,
  ({ body }, thunkAPI) => thunkAPI.extra.api.getJobOffers(body),
)



