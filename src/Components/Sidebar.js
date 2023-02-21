import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Sidebar = () => {

   const LinkClose = () => {
      if (document.body.classList.contains('toggle-sidebar')) {
         document.body.classList.remove('toggle-sidebar')
      }
   }
   const { logined, user } = useSelector(state => state.AuthLogin)

   return (
      <aside id="sidebar" className="sidebar">
         <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-heading">Asosiy</li>
            <li className="nav-item">
               <Link className="nav-link collapsed " to="/" onClick={LinkClose}  >
                  <i className="bi bi-house-door mb-1"></i>
                  <span>Bosh Sahifa</span>
               </Link>
            </li>
            <li className="nav-item" >
               <Link className="nav-link collapsed" to="/courses" onClick={LinkClose}>
                  <i className="bi bi-journal-code"></i>
                  <span>Kurslar</span>
               </Link>
            </li>
            {logined && <li className="nav-item">
               <Link className="nav-link collapsed " to="/profile" onClick={LinkClose}>
                  <i className="bi bi-gear"></i>
                  <span>Sozlamalar</span>
               </Link>
            </li>}
            <li className="nav-heading">sahifa</li>

            {logined ? <li className="nav-item">
               <Link className="nav-link collapsed " to="/profile" onClick={LinkClose} >
                  <i className="bi bi-person"></i>
                  <span>Profil</span>
               </Link>
            </li> : <>
               <li className="nav-item">
                  <Link className="nav-link collapsed " to="/login" onClick={LinkClose} >
                     <i className="bi bi-box-arrow-in-right"></i>
                     <span>Kirish</span>
                  </Link>
               </li>
            </>}
            <li className="nav-item">
               <a className="nav-link collapsed " target={'_blank'} href="https://t.me/@shaxzod_0206">
                  <i className="bi bi-question-circle"></i>
                  <span>FAQ</span>
               </a>
            </li>
            <li className="nav-item">
               <a className="nav-link collapsed " target={'_blank'} href="https://t.me/@shaxzod_0206">
                  <i className="bi bi-chat-left-text"  ></i>
                  <span>Chat</span>
               </a>
            </li>
            {logined && user && user.isadmin ? <li className="nav-item">
               <Link className="nav-link collapsed " to="/admin" >
                  <i className="bi bi-shield-lock-fill"  ></i>
                  <span>Admin</span>
               </Link>
            </li> : ""}
         </ul>
      </aside>
   )
}

export default Sidebar