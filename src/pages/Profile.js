import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import USER from '../services/users/User'
import { SuccessLogined } from '../redux/Reducers/Auth/AuthLogin'
import { useState } from 'react'
import Loading from '../Components/Loading'
import { CloseError, errorUserResetPassword } from '../redux/Reducers/user/User'
import { useEffect } from 'react'
const Profile = () => {
   const { error, errorText } = useSelector(state => state.MyUser)
   const [pass, setPass] = useState(false)
   const [imgfile, setImgFile] = useState("")
   const { user } = useSelector(state => state.AuthLogin)
   const dispatch = useDispatch()
   const [islaoding, setIsloading] = useState(false)

   const ReadFileAvatar = async (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(await file)
      reader.onload = () => {
         setImgFile(reader.result)
      }
   }
   const Filechang = e => {
      if (Math.floor(e.target.files[0].size / 1024) < 1024) {
         ReadFileAvatar(e.target.files[0])
      } else {
         alert('iltimos 1mb dan kichik bo\'lgan rasm yuklang !')
      }
   }

   const ProfileEdit = async e => {
      e.preventDefault()
      try {
         setIsloading(true)
         const aboutme = e.target[1].value
         const firstname = e.target[3].value
         const lastname = e.target[4].value
         const country = e.target[5].value
         const profilepic = imgfile ? imgfile : user.profilepic
         const UserData = { firstname, lastname, country, aboutme, profilepic }
         console.log(user._id)
         await USER.UpDateUser(user._id, UserData)
         const userData = await USER.GetMyUser()
         dispatch(SuccessLogined(userData))
         setIsloading(false)
      } catch (error) {
         setIsloading(false)
         console.log(error)
      }
   }

   const RePassword = async e => {
      e.preventDefault()
      const currentpassword = e.target[0].value
      const newpassword = e.target[1].value
      const confirimPassword = e.target[2].value
      if (currentpassword && newpassword && confirimPassword) {
         if (newpassword === confirimPassword) {
            const PasswordData = { currentpassword, newpassword }
            try {
               await USER.ResitPassword(user._id, PasswordData)
               dispatch(CloseError())
               e.target[0].value = ""
               e.target[1].value = ""
               e.target[2].value = ""
            } catch (error) {
               dispatch(errorUserResetPassword(error.response.data.err))
            }
         } else {
            dispatch(errorUserResetPassword(" Parol Tastiqlanmadi ! "))
         }
      }
   }

   const Close = () => {
      dispatch(CloseError())
   }
   useEffect(() => {
      setTimeout(() => {
         Close()
      }, 2000)
   }, [])
   return (
      <main id="main" className="main">

         <div className="pagetitle">
            <h1>Profile</h1>
            <nav>
               <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Bosh Sahifa</Link></li>
                  <li className="breadcrumb-item active">Profile</li>
               </ol>
            </nav>
         </div>

         <section className="section profile">
            <div className="row">
               <div className="col-xl-4">

                  <div className="card">
                     <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                        {user.profilepic ? <img src={user ? user.profilepic : ""} alt="Profile" className="rounded-circle" style={{ objectFit: 'cover', width: "65px", height: '65px' }} /> : <i className='bi bi-person-circle' style={{ fontSize: "50px" }} ></i>}
                        <h2 className='text-uppercase' >{user ? user.firstname : ""}</h2>
                        <h3 className='text-uppercase' >{user ? user.lastname : ""}</h3>
                     </div>
                  </div>

               </div>

               <div className="col-xl-8">

                  <div className="card">
                     <div className="card-body pt-3">
                        <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">

                           <li className="nav-item" role="presentation">
                              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview" aria-selected="true" role="tab" tabIndex="-1">Barchasi</button>
                           </li>

                           <li className="nav-item" role="presentation">
                              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" aria-selected="false" role="tab" tabIndex="-1">Profileni Tahrirlash</button>
                           </li>

                           <li className="nav-item" role="presentation">
                              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password" aria-selected="false" tabIndex="-1" role="tab">Parolni o'zgartirish</button>
                           </li>

                        </ul>
                        <div className="tab-content pt-2">

                           <div className="tab-pane fade show active profile-overview" id="profile-overview" role="tabpanel">
                              <h5 className="card-title">About</h5>
                              <p className="small fst-italic">{user ? user.aboutme : "No About "}</p>

                              <h5 className="card-title"> Profile Haqida </h5>

                              <div className="row">
                                 <div className="col-lg-3 col-md-4 label ">To'liq Ismim</div>
                                 <div className="col-lg-9 col-md-8"><i className='text-capitalize' >{user ? user.firstname : ""} {user ? user.lastname : ""}</i></div>
                              </div>

                              <div className="row">
                                 <div className="col-lg-3 col-md-4 label">Davalat</div>
                                 <div className="col-lg-9 col-md-8"> <i>{user ? user.country : " "}</i></div>
                              </div>

                              <div className="row">
                                 <div className="col-lg-3 col-md-4 label">Email</div>
                                 <div className="col-lg-9 col-md-8">{user ? user.email : ""}</div>
                              </div>

                           </div>

                           <div className="tab-pane fade profile-edit pt-3" id="profile-edit" role="tabpanel">
                              <form onSubmit={ProfileEdit} >
                                 <div className="row mb-3">
                                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                    <div className="col-md-8 col-lg-9">
                                       {user && user.profilepic ? <img src={user ? user.profilepic : ""} alt="Profile" /> : <i className='bi bi-person-circle' style={{ fontSize: "50px" }} ></i>}
                                       <div className="pt-2">
                                          <input type="file" id='upload' onChange={Filechang} style={{ display: 'none' }} />
                                          <label htmlFor='upload' className="btn btn-primary btn-sm" title="Upload new profile image"  ><i className="bi bi-upload text-white"></i></label>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                                    <div className="col-md-8 col-lg-9">
                                       <textarea name="about" className="form-control" id="about" style={{ height: " 100px" }} defaultValue={user ? user.aboutme : ""} ></textarea>
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                    <div className="col-md-8 col-lg-9">
                                       <input name="email" type="email" className="form-control" id="Email" readOnly defaultValue={user ? user.email : ''} />
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Ism</label>
                                    <div className="col-md-8 col-lg-9">
                                       <input type="text" className="form-control" id="fullName" defaultValue={user ? user.firstname : ""} />
                                    </div>
                                 </div>


                                 <div className="row mb-3">
                                    <label htmlFor="fullName1" className="col-md-4 col-lg-3 col-form-label">Familya</label>
                                    <div className="col-md-8 col-lg-9">
                                       <input type="text" className="form-control" id="fullName1" defaultValue={user ? user.lastname : ""} />
                                    </div>
                                 </div>
                                 <div className="row mb-3">
                                    <label htmlFor="fullName2" className="col-md-4 col-lg-3 col-form-label">Davlat</label>
                                    <div className="col-md-8 col-lg-9">
                                       <input type="text" className="form-control" id="fullName2" defaultValue={user ? user.country : ""} />
                                    </div>
                                 </div>


                                 <div className="text-center">
                                    <button type="submit" className="btn btn-primary" disabled={islaoding} >{islaoding ? <Loading /> : "Saqlash"}</button>
                                 </div>
                              </form>

                           </div>

                           <div className="tab-pane fade pt-3" id="profile-change-password" role="tabpanel">

                              <form onSubmit={RePassword} >
                                 {error && <div className="alert alert-danger alert-dismissible fade show py-2 " role="alert" style={{ display: 'felx', justifyContent: 'center', alignItems: 'center' }} >
                                    <i className="bi bi-exclamation-octagon me-1 "></i>
                                    &nbsp;&nbsp;  {errorText}
                                    <button type="button" className="btn-close pb-1" onClick={Close}></button>
                                 </div>}
                                 <div className="row mb-3">
                                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Oldingi Parolingizni Kiriting </label>
                                    <div className="col-md-8 col-lg-9">
                                       <input name="password" autoComplete={'off'} type={pass ? "text" : "password"} className="form-control" id="currentPassword" />
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Yangi Parol</label>
                                    <div className="col-md-8 col-lg-9">
                                       <input name="newpassword" autoComplete={'off'} type={pass ? "text" : "password"} className="form-control" id="newPassword" />
                                    </div>
                                 </div>

                                 <div className="row mb-3">
                                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Parolni Tastiqlang !</label>
                                    <div className="col-md-8 col-lg-9">
                                       <input name="renewpassword" autoComplete={'off'} type={pass ? "text" : "password"} className="form-control" id="renewPassword" />
                                    </div>
                                 </div>
                                 <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="changesMade" onChange={() => setPass((prev) => !prev)} />
                                    <label className="form-check-label" htmlFor="changesMade">
                                       Parolni Ko'rsat !
                                    </label>
                                 </div>
                                 <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Saqlash</button>
                                 </div>
                              </form>

                           </div>

                        </div>

                     </div>
                  </div>

               </div>
            </div>
         </section>
      </main>
   )
}

export default Profile