import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   error: false,
   errorText: ""
}

export const MyUser = createSlice({
   name: 'MyUser',
   initialState,
   reducers: {
      errorUserResetPassword: (state, action) => {
         state.error = true
         state.errorText = action.payload
      },
      CloseError: (state, action) => {
         state.errorText = ""
         state.error = false
      }
   }
})

export const { errorUserResetPassword, CloseError } = MyUser.actions
export default MyUser.reducer