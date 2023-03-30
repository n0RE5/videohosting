import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/Interfaces";

interface userState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
    error: string
}

const initUser: IUser = {
    id: 0,
    username: "",
    email: "",
    roles: "USER",
    profileImg: ""
}

const initialState: userState = {
    user: initUser,
    isAuth: false,
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUser(state) {
            state.isLoading = true
        },
        fetchUserSuccess(state, action: PayloadAction<IUser>) {
            state.isAuth = true
            state.isLoading = false
            state.error = ''
            state.user = action.payload
        },
        fetchUserError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        userLogout(state) {
            state.isAuth = false
            state.isLoading = false
            state.user = initUser
            state.error = ''
        }
    },
})

export default userSlice.reducer
export const {fetchUser, fetchUserSuccess, fetchUserError} = userSlice.actions