import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = ({ children }) => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: "14px",
        },
      }}
    >
      {children}
    </Toaster>
  );
};

export default Toast;
