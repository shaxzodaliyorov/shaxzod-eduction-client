import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import AddCourse from "../pages/add-course";
import AddVideo from "../pages/add-video";
import EditCourse from "../pages/edit-course";
import EditVideo from "../pages/edit-video";
import { SuccessLogined } from "../redux/Reducers/Auth/AuthLogin";
import USER from "../services/users/User";
const Profile = React.lazy(() => import("../pages/Profile"));
const Login = React.lazy(() => import("../pages/Login"));
const Notfound = React.lazy(() => import("../pages/Notfound"));
const Register = React.lazy(() => import("../pages/Register"));
const Video = React.lazy(() => import("../pages/Video"));
const Admin = React.lazy(() => import("../pages/Admin"));
const Home = React.lazy(() => import("../pages/Home"));
const Courses = React.lazy(() => import("../pages/Courses"));
const CourseAbout = React.lazy(() => import("../pages/CourseAbout"));
const RouterCom = () => {
  const { logined, user } = useSelector((state) => state.AuthLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetMyUser = async () => {
      if (logined) {
        const data = await USER.GetMyUser();
        dispatch(SuccessLogined(data));
      }
    };
    GetMyUser();
  }, [logined]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:slug" element={<CourseAbout />} />
          <Route
            path={"/course/:id/:title"}
            element={logined ? <Video /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={logined ? <Profile /> : <Navigate to="/login" />}
          />
          {!logined && <Route path="/login" element={<Login />} />}
          {!logined && <Route path="/register" element={<Register />} />}
          {logined && user && user.isadmin ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            ""
          )}
          {logined && user && user.isadmin ? (
            <Route path="/admin/edit-course/:slug" element={<EditCourse />} />
          ) : (
            ""
          )}
          {logined && user && user.isadmin ? (
            <Route path="/admin/add-course" element={<AddCourse />} />
          ) : (
            ""
          )}
          {logined && user && user.isadmin ? (
            <Route path="/admin/add-video" element={<AddVideo />} />
          ) : (
            ""
          )}
          {logined && user && user.isadmin ? (
            <Route path="/admin/edit-video/:id" element={<EditVideo />} />
          ) : (
            ""
          )}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default RouterCom;
