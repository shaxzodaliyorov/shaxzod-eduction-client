import React from 'react'
import './Loader.css'
const Loader = () => {
   return (
      <div className='Loader_spinner' >
         <div className=" Loadering text-4xl spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
         &nbsp;&nbsp; Loading...
      </div>
   )
}

export default Loader