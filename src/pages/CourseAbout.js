import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CourseAboudLayoutRight from '../Components/CourseAboudLayoutRight'
import CourseAboutLayoutleft from '../Components/CourseAboutLayoutleft'
import COURSES from '../services/courses/Courses'
const CourseAbout = () => {
  const { logined } = useSelector(state => state.AuthLogin)
  const [course, setCourse] = useState({})
  const { id } = useParams()
  useEffect(() => {
    const GetOneCourse = async () => {
      const data = await COURSES.GETONE(id)
      setCourse(data)
    }
    GetOneCourse()
  }, [])
  return (
    <main id="main" className="main" >
      <div className="pagetitle px-2">
        <h1>Courses</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Bosh Sahifa</Link></li>
            <li className="breadcrumb-item"><Link to="/courses">Kurslar</Link></li>
            <li className="breadcrumb-item active">{course.title}</li>
          </ol>
        </nav>
      </div>
      <section className="section px-2" >
        <div className="row">
          {/*  */}
          <CourseAboutLayoutleft title={course.title} logined={logined} courseImg={course.courseImg} id={id} />
          {/* {} */}
          <CourseAboudLayoutRight title={course.title} tech={course.tech} techimg={course.techimg} price={course.price} videos={course.videos} hours={course.hours} dagree={course.dagree} language={course.language} />
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tavsif</h5>
                {course.discription}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CourseAbout