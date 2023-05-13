import Cookies from 'js-cookie';
import { API } from '../../API/Config';
const USER = {
	async GetMyUser() {
		const token = Cookies.get('token') ? Cookies.get('token') : '';
		const { data } = await API.get('/user/one', { headers: { authorization: `${token}` } });
		return data;
	},
	async UpDateUser(id, userData) {
		const { data } = await API.put(`/user/update/${id}`, userData);
		return data;
	},
	async ResitPassword(id, userData) {
		const { data } = await API.put(`/user/resetpassword/${id}`, userData);
		return data;
	},
	async GETALLUSERS(userid) {
		const { data } = await API.get(`/user/all/${userid}`);
		return data;
	},
};

export default USER;