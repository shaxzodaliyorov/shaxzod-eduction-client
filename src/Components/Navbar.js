import React from 'react'
import profile from '../images/profile-img.jpg'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RemoveItem } from '../hooks/LocalStorge'
import { logOunt } from '../redux/Reducers/Auth/AuthLogin'
const Navbar = () => {
   const dispatch = useDispatch()

   const navigate = useNavigate()

   const { user } = useSelector(state => state.AuthLogin)

   const BurgerToggle = () => {
      document.body.classList.toggle('toggle-sidebar')
   }

   const LogOut = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('courseid')
      navigate('/login')
      dispatch(logOunt())
   }

   const { logined } = useSelector(state => state.AuthLogin)

   return (
      <header id="header" className="header fixed-top d-flex align-items-center px-4">
         <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="logo d-flex align-items-center">
               <img src={logo} alt="" />
               <span className="d-none d-lg-block">ShaxZod</span>
            </Link>
            <i className="bi bi-list toggle-sidebar-btn burger_btn" onClick={BurgerToggle} ></i>
         </div>

         {logined ? <>
            <nav className="header-nav ms-auto">
               <ul className="d-flex align-items-center">

                  <li className="nav-item dropdown pe-3">

                     <Link className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                        {user && user.profilepic ? <img src={user.profilepic} alt="Profile" className="rounded-circle" style={{ width: "35px", height: '35px', objectFit: 'cover' }} /> : <i style={{ fontSize: '25px' }} className='bi bi-person-circle rounded-circle mb-1' ></i>}
                        <span className="d-none d-md-block dropdown-toggle ps-2" style={{ textTransform: 'uppercase' }}  > {user ? user.firstname : ""} <i className='bi bi-patch-check-fill mx-1 ' style={{ color: '#4154f1' }} ></i></span>
                     </Link>

                     <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li className="dropdown-header">
                           <h6 style={{ textTransform: 'uppercase' }} >{user ? user.firstname : " "}</h6>
                           <span style={{ textTransform: "capitalize" }} >{user ? user.lastname : ""}</span>
                        </li>
                        <li>
                           <hr className="dropdown-divider" />
                        </li>

                        <li>
                           <Link className="dropdown-item d-flex align-items-center" to={'/profile'} >
                              <i className="bi bi-person"></i>
                              <span>Mening Profilim</span>
                           </Link>
                        </li>
                        <li>
                           <hr className="dropdown-divider" />
                        </li>

                        <li>
                           <Link className="dropdown-item d-flex align-items-center" to="/profile" >
                              <i className="bi bi-gear"></i>
                              <span>Sozlamalar</span>
                           </Link>
                        </li>
                        <li>
                           <hr className="dropdown-divider" />
                        </li>

                        <li>
                           <a className="dropdown-item d-flex align-items-center" href="https://t.me/@shaxzod_0206" target={"_blank"} >
                              <i className="bi bi-question-circle"></i>
                              <span>FAQ</span>
                           </a>
                        </li>
                        <li>
                           <hr className="dropdown-divider" />
                        </li>

                        <li>
                           <Link className="dropdown-item d-flex align-items-center" to="/login" onClick={LogOut} >
                              <i className="bi bi-box-arrow-right text-danger"></i>
                              <span className='text-danger' >Chiqish</span>
                           </Link>
                        </li>

                     </ul>
                  </li>

               </ul>
            </nav>
         </> : <nav className='header-nav ms-auto' ><Link to={"/login"} ><button className='btn btn-primary px-4' ><i className='bi bi-box-arrow-in-right' ></i></button></Link></nav>}
      </header>
   )
}

export default Navbar