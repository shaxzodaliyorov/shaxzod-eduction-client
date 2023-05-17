import { useEffect } from "react";
import AdminAddVideoComponet from "../Components/admin-add-video-componet";

const AddVideo = () => {
  useEffect(() => {
    document.title = "Shaxzod | Video Qo'shish ";
  }, []);
  return <AdminAddVideoComponet />;
};

export default AddVideo;
