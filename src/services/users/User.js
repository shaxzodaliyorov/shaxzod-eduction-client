import { API } from '../../API/Config'
import { GetItem } from '../../hooks/LocalStorge'

const USER = {
   async GetMyUser() {
      const token = GetItem('token') ? GetItem('token') : ""
      const { data } = await API.get('/user/one', { headers: { "authorization": `${token}` } })
      return data
   },
   async UpDateUser(id, userData) {
      const { data } = await API.put(`/user/update/${id}`, userData)
      return data
   },
   async ResitPassword(id, userData) {
      const { data } = await API.put(`/user/resetpassword/${id}`, userData)
      return data
   },
   async GETALLUSERS(userid) {
      const { data } = await API.get(`/user/all/${userid}`)
      return data
   }
}

export default USER