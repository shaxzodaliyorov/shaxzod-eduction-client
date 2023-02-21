import { API } from '../../API/Config'

const VIDEOS = {
   async GET(courseid) {
      const { data } = await API.get(`/videos/get/${courseid}`)
      return data
   },
   async GETALL() {
      const { data } = await API.get(`/videos/allget/`)
      return data
   },
   async ADDVIDEO(courseid, userid, videodata) {
      const { data } = await API.post(`/videos/post/${courseid}/${userid}`, videodata)
      return data
   },
   async DELETE(videoid, userid) {
      const { data } = await API.delete(`/videos/delete/${videoid}/${userid}`)
      return data
   },
   async UPDATE(videoid, userid, updateVideoData) {
      const { data } = await API.put(`/videos/update/${videoid}/${userid}`, updateVideoData)
      return data
   }
}

export default VIDEOS