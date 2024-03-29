import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TimeVideo } from "../helper/video-time";
import { GetItem, SetItem } from "../hooks/LocalStorge";
import COURSES from "../services/courses/Courses";
import VIDEOS from "../services/videos/Videos";
const Video = () => {
  const { id } = useParams();
  const [Course, setCourse] = useState({});
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(
    GetItem("count_video") ? GetItem("count_video") : 0
  );
  const [active, setActive] = useState(
    GetItem("activeVideo") ? GetItem("activeVideo") : ""
  );
  const [loading, setLoading] = useState(false);
  const GetCourse = async () => {
    setLoading(true);
    const data = await COURSES.GETONE(id);
    setCourse(data);
    setLoading(false);
  };

  const GetVideos = async () => {
    try {
      setLoading(true);
      const videos = await VIDEOS.GET(id);
      setVideos(videos);
      setLoading(false);
      // setActive(videos !== [] ? videos[0]._id : "")
    } catch (error) {
      console.log(error);
    }
  };
  const ActiveBtn = (item, index) => {
    SetItem("activeVideo", item._id);
    setActive(GetItem("activeVideo") ? GetItem("activeVideo") : "");
    SetItem("count_video", index);
    setCount(GetItem("count_video") ? GetItem("count_video") : 0);
  };
  useEffect(() => {
    GetVideos();
    GetCourse();
    document.title = `Shaxzod | ${videos[count]?.title} `;
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle px-2">
        <h1>{Course?.title}</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Bosh Sahifa</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/courses">Chiqish</Link>
            </li>
          </ol>
        </nav>
      </div>
      <section className="section px-2">
        {
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <iframe
                  src={
                    videos[count] !== undefined ? videos[count].videolink : ""
                  }
                  title="YouTube video player"
                  style={{ width: "100%", height: "350px" }}
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
                <h4 className="m-2">{videos[count]?.title}</h4>
                <p className="m-2">{videos[count]?.videoDisc}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{Course?.title}</h5>
                  {videos === [] ? (
                    <>
                      <h2>Kurs Videolari Yo'q</h2>
                    </>
                  ) : (
                    <>
                      <div className="list-group">
                        {videos.map((item, index) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => ActiveBtn(item, index)}
                              className={`list-group-item list-group-item-action ${
                                active === item?._id ? "active" : ""
                              } `}
                            >
                              <div className="row">
                                <div className="col-10">{item?.title}</div>
                                <div className="col-2 text-end">
                                  {TimeVideo(item?.hours,item?.minutus,item?.seconds)}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </section>
    </main>
  );
};

export default Video;
