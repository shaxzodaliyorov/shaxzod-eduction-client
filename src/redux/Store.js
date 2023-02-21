import { configureStore } from '@reduxjs/toolkit'
import AuthRegister from './Reducers/Auth/AuthRegister'
import AuthLogin from './Reducers/Auth/AuthLogin'
import MyUser from './Reducers/user/User'
const Store = configureStore({
   reducer: { MyUser, AuthRegister, AuthLogin }
})

export default Store