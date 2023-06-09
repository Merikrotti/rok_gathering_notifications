import React from 'react';
import './popup.css';

const Popup = (props) => {
    return (
      <div className="popup">
        <div className="popup-content">
          {props.children}
        </div>
      </div>
    );
}

export default Popup;