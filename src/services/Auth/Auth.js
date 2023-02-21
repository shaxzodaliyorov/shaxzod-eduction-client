import { API } from '../../API/Config'

const AUTH = {
   async Register(userData) {
      const { data } = await API.post('/auth/register', userData)
      return data
   },
   async Login(userdata) {
      const { data } = await API.post('/auth/login', userdata)
      return data
   }
}


export default AUTH