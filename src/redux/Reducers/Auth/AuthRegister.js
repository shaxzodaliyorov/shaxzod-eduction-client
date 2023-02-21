import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   error: false,
   Errortext: '',
}


export const AuthRegister = createSlice({
   name: 'register',
   initialState,
   reducers: {
      ErrorRegsiter: (state, action) => {
         state.error = true
         state.Errortext = action.payload
      },
      successRegister: (state, action) => {
         state.error = false
         state.Errortext = ""
      }
   }
})


export const { ErrorRegsiter, successRegister } = AuthRegister.actions
export default AuthRegister.reducer