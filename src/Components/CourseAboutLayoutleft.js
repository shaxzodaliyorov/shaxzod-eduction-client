import React from "react";
import { Link } from "react-router-dom";
import { api } from "../API/Config";
const CourseAboutLayoutleft = ({
  courseItem,
  title,
  courseImg,
  logined,
  id,
}) => {
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <img
            src={api+courseImg}
            alt=""
            className="card-img-top"
            style={{ maxWidth: "100%", height: "450px", objectFit: "cover" }}
          />
        </div>
        <div className="card-footer">
          <Link to={logined ? `/course/${id}/${courseItem?.slug}` : "/login"}>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" type="button">
                Kursni Ko'rish
              </button>
            </div>
          </Link>
          <a href="https://t.me//@shaxzod_0206" target={"_blank"}>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-outline-success" type="button">
                Donat qilish
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseAboutLayoutleft;
