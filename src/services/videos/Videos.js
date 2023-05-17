import { API } from '../../API/Config'

const VIDEOS = {
   async GET(courseid) {
      const { data } = await API.get(`/videos/get/${courseid}`)
      return data
   },
   async GETALL(userid) {
      const { data } = await API.get(`/videos/all/${userid}`)
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
   },
   async GET_VIDEO(videoid,userid){
      const {data} = await API.get(`/videos/one/${videoid}/${userid}`)
      return data
   }
}

export default VIDEOS