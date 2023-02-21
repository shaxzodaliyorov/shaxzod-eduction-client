import React from 'react'
import { successRegister } from '../redux/Reducers/Auth/AuthRegister'
import { noError } from '../redux/Reducers/Auth/AuthLogin'
import { useDispatch } from 'react-redux'
const Error = ({ text = "" }) => {
   const dispatch = useDispatch()
   const Close = () => {
      dispatch(successRegister())
      dispatch(noError())
   }
   return (
      <div className="alert alert-danger alert-dismissible fade show py-2 " role="alert" style={{ display: 'felx', justifyContent: 'center', alignItems: 'center' }} >
         <i className="bi bi-exclamation-octagon me-1 "></i>
         &nbsp;&nbsp;  {text}
         <button type="button" className="btn-close pb-1" onClick={Close}></button>
      </div>
   )
}

export default Error