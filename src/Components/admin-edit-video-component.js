import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import COURSES from "../services/courses/Courses";
import VIDEOS from "../services/videos/Videos";
import { Loading } from "./Loading";
const AdminEditVideoComponent = () => {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
  const [minutus, setMinutus] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [videolink, setVideolink] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState();
  const [videoDisc, setVideoDisc] = useState();

  const { id } = useParams();

  const { user } = useSelector((state) => state.AuthLogin);

  const getVideo = async () => {
    const res = await VIDEOS.GET_VIDEO(id, user._id);
    setTitle(res?.title);
    setHours(res?.hours);
    setMinutus(res?.minutus);
    setSeconds(res?.seconds);
    setVideolink(res?.videolink);
    setVideoDisc(res?.videoDisc);
    setCourse(res?.course);
  };

  const navigate = useNavigate();

  const UpdateVideo = async (e) => {
    e.preventDefault();
    try {
      const data = { title, hours, minutus, seconds, videolink, videoDisc };
      await VIDEOS.UPDATE(id, user._id, data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center ">
                <div className="col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div>
                        <h5 className="card-title text-center pb-0 fs-4">
                          Video Qo'shish
                        </h5>
                        <p className="text-center small">
                          Video Ma'lumotlarini kiriting !
                        </p>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        onSubmit={UpdateVideo}
                      >
                        <div className="col-12">
                          <label htmlFor="title" className="form-label">
                            video nomi
                          </label>
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="form-control"
                            id="title"
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="hours" className="form-label">
                            Soat
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="number"
                              value={hours}
                              onChange={(e) => setHours(e.target.value)}
                              id="hours"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="minut" className="form-label">
                            Minut
                          </label>
                          <div className="input-group has-validation">
                            <input
                              value={minutus}
                              onChange={(e) => setMinutus(e.target.value)}
                              type="number"
                              id="minut"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="second" className="form-label">
                            Sekund
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="number"
                              value={seconds}
                              onChange={(e) => setSeconds(e.target.value)}
                              id="second"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="video" className="form-label">
                            video
                          </label>
                          <input
                            value={videolink}
                            onChange={(e) => setVideolink(e.target.value)}
                            type="text"
                            className="form-control"
                            id="video"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="dec" className="form-label">
                            description
                          </label>
                          <textarea
                            value={videoDisc}
                            onChange={(e) => setVideoDisc(e.target.value)}
                            type="text"
                            className="form-control"
                            id="dec"
                          ></textarea>
                        </div>

                        <div className="col-12">
                          <button
                            className={`btn btn-primary w-100 ${
                              false ? "cursor-no-drop" : ""
                            }`}
                            type="submit"
                            disabled={false}
                          >
                            {false ? <Loading /> : "videoni tahrirlash "}{" "}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminEditVideoComponent;
