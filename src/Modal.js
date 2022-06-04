import React from "react";
import "./modal.css";

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div onClick={closeModal} className="overlay">
      <div onClick={(e) => e.stopPropagation()} className="content">
        <button onClick={closeModal} className={"close"}>
          X
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
