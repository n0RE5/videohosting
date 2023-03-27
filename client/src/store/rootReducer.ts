import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "./reducers/UserSlice"

const reducer = combineReducers({
    userSlice
})

export default reducer