import React from 'react'

const CourseAboudLayoutRight = ({ title, price, techimg, tech, videos, hours, dagree, language }) => {
  console.log(dagree)
  return (
    <>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h5 className="card-title">{title}</h5>
              </div>
              <div className="col-6 text-end  "><div className='mt-3' ><del>200 000 so'm</del></div></div>
            </div>
            <ul className="list-group"  >
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} > {techimg ? <img src={techimg} style={{ width: '35px', height: "35px", borderRadius: '50%' }} alt={title} /> : <i className="bi bi-person-circle"> &nbsp;&nbsp;&nbsp; Ustoz </i>} {tech}</li>
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} ><i className="bi bi-currency-dollar"> &nbsp;&nbsp;&nbsp; Narxi</i> {price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</li>
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} ><i className="bi bi-card-checklist"> &nbsp;&nbsp;&nbsp;  Darslar </i> {videos ? videos.length : "0"} ta</li>
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} ><i className="bi bi-alarm"> &nbsp;&nbsp;&nbsp; Umumiy Soat </i> {hours}</li>
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} ><i className="bi bi-bar-chart-line">&nbsp;&nbsp;&nbsp; Daraja </i>{dagree}</li>
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} ><i className="bi bi-bootstrap-reboot"> &nbsp;&nbsp;&nbsp; Dostup </i> Bir Umir</li>
              <li className="list-group-item  py-4 " style={{ display: 'flex', justifyContent: 'space-between' }} ><i className="bi bi-translate"> &nbsp;&nbsp;&nbsp; Til </i> {language}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseAboudLayoutRight