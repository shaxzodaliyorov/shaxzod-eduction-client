import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VIDEOS from "../services/videos/Videos";

const AdminVidoesComponent = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({});

  const { user } = useSelector((state) => state.AuthLogin);

  const GetVideos = async () => {
    const res = await VIDEOS.GETALL();
    res && setVideos(res);
  };

  const currentDeleteVideo = (videoItem) => setVideo(videoItem);

  const DeleteVideo = async (video) => {
    try {
      await VIDEOS.DELETE(video._id, user._id);
      GetVideos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetVideos();
  }, []);

  return (
    <>
      <div className="row py-2">
        <div className="col-6">
          <h3>Barcha videolar</h3>
        </div>
        <div className="col-6 text-end">
          <button
            className="btn btn-sm btn-success"
            onClick={() => navigate("/admin/add-video")}
          >
            video Qo'shish
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
                <th>kusrni nomi</th>
                <th>video linki</th>
                <th>soat</th>
                <th>minut</th>
                <th>sekund</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {videos.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.coursetitle}</td>

                  <td>
                    <textarea
                      onChange={() => null}
                      value={item.videolink}
                    ></textarea>
                  </td>
                  <td>{item.hours}</td>
                  <td>{item.minutus}</td>
                  <td>{item.seconds}</td>

                  <td>
                    <button
                      onClick={() => navigate(`/admin/edit-video/${item._id}`)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => currentDeleteVideo(item)}
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
      <DeleteModal DeleteVideo={DeleteVideo} video={video} />
    </>
  );
};

export default AdminVidoesComponent;

export const DeleteModal = ({ video, DeleteVideo }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {video.title}
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
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => DeleteVideo(video)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
