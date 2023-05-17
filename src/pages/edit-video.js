import { useEffect } from "react";
import AdminEditVideoComponent from "../Components/admin-edit-video-component";

const EditVideo = () => {
  useEffect(() => {
    document.title = "Shaxzod | Video Tahrirlash ";
  }, []);

  return <AdminEditVideoComponent />;
};

export default EditVideo;
