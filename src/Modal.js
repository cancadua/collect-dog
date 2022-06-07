import React from "react";
import "./modal.css";

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div onClick={closeModal} className="overlay">
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
