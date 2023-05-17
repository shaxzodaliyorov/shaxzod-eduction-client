import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../API/Config";
import COURSES from "../services/courses/Courses";

const AdminCoursesComponent = () => {
  const [courses, setCourses] = useState([]);

  const [courseTitle, setCourseTitle] = useState({});
  const { user } = useSelector((state) => state.AuthLogin);

  const CurrentDeleteCourse = (course) => {
    setCourseTitle(course);
  };

  const getResult = async () => {
    const res = await COURSES.GET();
    setCourses(res);
  };

  const deleteCourse = async (id) => {
    try {
      await COURSES.DELETE(id, user._id);
      getResult();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="row py-2">
        <div className="col-6">
          <h3>Barcha Kurslar</h3>
        </div>
        <div className="col-6 text-end">
          <button
            className="btn btn-sm btn-success"
            onClick={() => navigate("/admin/add-course")}
          >
            Add course
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>title</th>
                <th>videos</th>
                <th>img</th>
                <th>teacher</th>
                <th>price</th>
                <th>techimg </th>
                <th>tutorial</th>
                <th>discription</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/courses/${item.slug}`)}
                  >
                    {item.title}
                  </td>
                  <td>{item.videos.length}</td>
                  <td>
                    <img
                      src={api+item.courseImg}
                      width="40"
                      height={"40"}
                      alt={"shaxzod aliyorov"}
                    />
                  </td>
                  <td>{item.tech}</td>
                  <td>
                    {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>
                    <img
                      src={item.techimg}
                      width="40"
                      height={"40"}
                      alt={"shaxzod aliyorov"}
                    />
                  </td>
                  <td>
                    <textarea
                      onChange={() => null}
                      value={item.tutorial}
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      onChange={() => null}
                      value={item.discription}
                    ></textarea>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        navigate(`/admin/edit-course/${item.slug}`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => CurrentDeleteCourse(item)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* delete modal */}
      <DeleteModal course={courseTitle} deleteCourse={deleteCourse} />
    </>
  );
};

export default AdminCoursesComponent;

export const DeleteModal = ({ course, deleteCourse }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {course.title} kursi o'chirilsinmi ?
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Bekor Qilish
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteCourse(course._id)}
            >
              O'chirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
