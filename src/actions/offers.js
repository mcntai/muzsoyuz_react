import { ACTION_PREFIXES as p } from '../constants/action-types'
import apiAction from "./api-action"


export const makeOffer = apiAction(
  p.OFFER_MAKE,
  ({ body }, thunkAPI) => thunkAPI.extra.api.makeJobOffer(body),
)

export const fetchOffers = apiAction(
  p.OFFER_FETCH,
  ({ body }, thunkAPI) => thunkAPI.extra.api.getJobOffers(body),
)