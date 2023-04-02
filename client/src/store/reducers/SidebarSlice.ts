import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sidebarState {
    active: boolean
}

const initialState: sidebarState = {
    active: true
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        switchState(state) {
            state.active = !state.active
        }
    },
})

export default sidebarSlice.reducer
export const {switchState} = sidebarSlice.actions