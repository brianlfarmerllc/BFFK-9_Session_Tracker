import React from 'react';
import "./modal.css"


const Modal = (props) => {
    return (
        <div className="container popup">
            <div className="row justify-content-center">
                {props.children}
            </div>
        </div>
    );
};


export default Modal;