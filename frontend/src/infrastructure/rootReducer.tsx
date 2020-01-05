import { combineReducers } from "redux"
import password from "password/features/general/passwordReducer"
import general from "common/generalReducer"

export default combineReducers({
  general,
  password
})
