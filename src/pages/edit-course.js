import { useEffect } from "react";
import AdminEditCourseComponent from "../Components/admin-edit-course-component";

const EditCourse = () => {
  useEffect(() => {
    document.title = "Shaxzod | Kursni Tahrirlash ";
  }, []);
  return <AdminEditCourseComponent />;
};

export default EditCourse;
