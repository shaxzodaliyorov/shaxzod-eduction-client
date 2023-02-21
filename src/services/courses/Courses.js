import { API } from "../../API/Config";

const COURSES = {
   async GET() {
      const { data } = await API.get('/courses/get')
      return data
   },
   async GETONE(id) {
      const { data } = await API.get(`/courses/get/${id}`)
      return data
   },
   async ADDCOURSE(userid, courseData) {
      const { data } = await API.post(`/courses/post/${userid}`, courseData)
      return data
   },
   async UPDATE(id, courseData) {
      const { data } = await API.put(`/courses/update/${id}`, courseData)
      return data
   },
   async DELETE(id, userid) {
      const { data } = await API.delete(`/courses/delete/${id}/${userid}`)
      return data
   }
}

export default COURSES