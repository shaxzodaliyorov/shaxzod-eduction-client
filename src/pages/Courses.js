import React from 'react'
import CourseCard from '../Components/CourseCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import COURSES from '../services/courses/Courses'
import Loader from '../Components/Loader'
const Courses = () => {
   const [result, setResult] = useState([])
   const [loading, setLoading] = useState(false)
   useEffect(() => {
      const GetCourses = async () => {
         setLoading(true)
         const courses = await COURSES.GET()
         setResult(courses)
         setLoading(false)
      }
      GetCourses()
   }, [])


   return (
      <main id="main" className="main">
         <div className="pagetitle px-2">
            <h1>Barcha Kurslar</h1>
            <nav>
               <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Bosh Sahifa</Link></li>
                  <li className="breadcrumb-item active">Kurslar</li>
               </ol>
            </nav>
         </div>

         <section className="section px-2">
            {loading ? <Loader /> : <div className="row">
               {result.map((item, index) => {
                  return <CourseCard price={item.price} id={item._id} courseImg={item.courseImg} tech={item.tech} title={item.title} key={index} techimg={item.techimg} />
               })}
            </div>}
         </section>
      </main>
   )
}

export default Courses