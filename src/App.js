import React, { useState, useEffect } from "react";
import RouterCom from "./Router/RouterCom";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <RouterCom />
      <ToastContainer />
    </>
  );
};

export default App;
