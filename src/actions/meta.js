import apiAction from "./api-action"
import { ACTIONS as p } from "../constants/action-types"


export const fetchRoles = apiAction(
  p.META_ROLES_FETCH,
  (_, thunkAPI) => thunkAPI.extra.api.getRoles()
)