import { combineReducers } from "redux"
import password from "password/features/general/passwordReducer"
import general from "password/infrastructure/generalReducer"

export default combineReducers({
  general,
  password
})
