import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
	error: false,
	errorText: '',
	token: Cookies.get('token'),
	logined: Cookies.get('token') ? true : false,
	user: {},
};

export const AuthLogin = createSlice({
	name: 'login',
	initialState,
	reducers: {
		ErrorLogined: (state, action) => {
			state.error = true;
			state.errorText = action.payload;
			state.logined = false;
		},
		SuccessLogined: (state, action) => {
			state.logined = Cookies.get('token') ? true : false;
			state.errorText = '';
			state.error = false;
			state.user = action.payload;
		},
		noError: (state, action) => {
			state.error = false;
			state.logined = false;
			state.errorText = '';
		},
		logOunt: (state, action) => {
			state.logined = false;
			state.errorText = '';
			state.error = false;
			state.token = '';
			state.user = {};
		},
	},
});

export const { ErrorLogined, SuccessLogined, logOunt, noError } = AuthLogin.actions;
export default AuthLogin.reducer;
