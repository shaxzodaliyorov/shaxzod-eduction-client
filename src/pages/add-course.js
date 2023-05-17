import { useEffect } from "react";
import AdminAddCourseComponent from "../Components/admin-add-course-component";
const AddCourse = () => {
  useEffect(() => {
    document.title = "Shaxzod | Kurs Qo'shish ";
  }, []);

  return <AdminAddCourseComponent />;
};

export default AddCourse;
