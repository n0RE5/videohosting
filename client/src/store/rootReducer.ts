import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "./reducers/UserSlice"
import sidebarSlice from "./reducers/SidebarSlice"

const reducer = combineReducers({
    userSlice,
    sidebarSlice
})

export default reducer