import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../app/store";
import {IUser} from "../interfaces";

interface UserState {
    user?: IUser
}

const initialState: UserState = {
    user: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        set: (state,action: PayloadAction<IUser>) => {
            state.user = action.payload;
        }
    },
})

export const { set } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
