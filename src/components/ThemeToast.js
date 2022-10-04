import React from "react";
import { Zoom, ToastContainer } from 'react-toastify';


function ThemeToast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1750}
      hideProgressBar={true}
      newestOnTop
      closeOnClick={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      transition={Zoom}
      closeButton={false}
      />
  );
}

export {ThemeToast};
