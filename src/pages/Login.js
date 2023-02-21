import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AUTH from '../services/Auth/Auth'
import Loading from '../Components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { SetItem } from '../hooks/LocalStorge'
import { ErrorLogined, SuccessLogined } from '../redux/Reducers/Auth/AuthLogin'
import Error from '../Components/Error'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
const Login = () => {

   const navigate = useNavigate()

   const [username, setUsernme] = useState('')
   const [password, setPassword] = useState('')

   const [isloading, setIsloading] = useState(false)

   const [usernameValid, setusernameValid] = useState({ ms: '', active: false, sendval: false })
   const [passwordValid, setPasswordValid] = useState({ ms: '', active: false, sendval: false })

   const dispatch = useDispatch()

   const { error, errorText, token } = useSelector(state => state.AuthLogin)
   const HandelerChange = e => {
      const { name, value } = e.target
      // username
      if (name === 'email') {
         if (value === "") {
            setusernameValid({ ms: 'Email Kiritilmadi ! ', active: true, sendval: false })
         } else {
            setusernameValid({ ms: '', active: false, sendval: true })
         }
         setUsernme(value)
      }
      // password
      if (name === 'Password') {
         if (value.length === 0) {
            setPassword({ ms: 'Parol Kiritilmadi !', active: true, sendval: false })
         } else if (value.length < 6) {
            setPasswordValid({ ms: 'Parol 6 tadan kam bo\'lmasin !', active: true, sendval: false })
         } else {
            setPasswordValid({ ms: '', active: false, sendval: true })
         }
         setPassword(value)
      }
   }

   const ChangeHandeler = (e) => {
      HandelerChange(e)
   }

   const onBlurValid = (e) => {
      const { value, name } = e.target
      if (name === "email") {
         if (value === "") {
            setusernameValid({ ms: 'Email Kiritilmadi ! ', active: true, sendval: false })
         }
      }

      if (name === "Password") {
         if (value === "") {
            setPasswordValid({ ms: 'Parol Kiritilmadi !', active: true, sendval: false })
         }
      }
   }

   const SubmitHandler = async e => {
      e.preventDefault()
      if (!username && !password) {
         setusernameValid({ ms: 'Email Kiritilmadi ! ', active: true, sendval: false })
         setPasswordValid({ ms: 'Parol Kiritilmadi !', active: true, sendval: false })
      } else {
         if (usernameValid.sendval && passwordValid.sendval) {
            try {
               setIsloading(true)
               const user = { email: username, password: password }
               const data = await AUTH.Login(user)
               setIsloading(false)
               SetItem('token', data.token)
               dispatch(SuccessLogined())
               navigate('/')
               toast.success('Tizmga Mufaqiyatli kirildi !', {
                  position: 'top-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                  theme: 'dark'
               })
            } catch (error) {
               setIsloading(false)
               console.log(error)
               dispatch(ErrorLogined(error.response.data.err))
               toast.error("Server yoki Internet Muamosi !", {
                  position: 'top-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                  theme: 'dark'
               })
            }
         }
      }
   }

   return (
      <main>
         <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                        <div className="card">

                           <div className="card-body">

                              <div>
                                 <h5 className="card-title text-center pb-0 fs-4">Kirish ! </h5>
                                 <p className="text-center small">Emailingiz va &amp; Parolingizni Kiriting !</p>
                              </div>
                              {error && <Error text={errorText} />}
                              <form className="row g-3 needs-validation" onSubmit={SubmitHandler} >

                                 <div className="col-12">
                                    <label htmlFor="yourUsername" className="form-label">Emailingiz</label>
                                    <div className="input-group has-validation">
                                       <input type="email" name="email" className="form-control" id="yourUsername" onBlur={onBlurValid} onChange={ChangeHandeler} />
                                    </div>
                                    {usernameValid.active && <div style={{ fontSize: '.875em' }} className="text-danger">{usernameValid.ms}</div>}
                                 </div>

                                 <div className="col-12">
                                    <label htmlFor="yourPassword" className="form-label">Parolingiz</label>
                                    <input type="password" name="Password" className="form-control" id="yourPassword" onBlur={onBlurValid} onChange={ChangeHandeler} autoComplete='off' />
                                    {passwordValid.active && <div style={{ fontSize: '.875em' }} className="text-danger">{passwordValid.ms}</div>}
                                 </div>
                                 <div className="col-12">
                                    <button style={{ cursor: `${isloading ? "no-drop" : "pointer"}` }} className={`btn btn-primary w-100 cursor-no-drop ${isloading ? "cursor-no-drop" : "cursor-pointer"} `} type="submit" disabled={isloading} >{isloading ? <Loading /> : " Login"}</button>
                                 </div>
                                 <div className="col-12">
                                    <p className="small mb-0">Akkauntingiz yo'qmi ? <Link to="/register">Ro'yxatdan o'tish</Link></p>
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
   )
}

export default Login