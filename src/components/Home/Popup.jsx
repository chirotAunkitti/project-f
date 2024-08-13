import React from 'react';
import ReactDOM from 'react-dom';
import './Popup.css'; // ไฟล์ CSS ของป๊อปอัป

function Popup({ item, onClose }) {
  if (!item) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h3>{item.name}</h3>
        <img src={item.image} alt={item.name} className="popup-image" />
        <p>{item.description}</p>
        <button className="project-button" onClick={onClose}>Close project</button>
      </div>
    </div>,
    document.body // ทำให้ป๊อปอัปแสดงอยู่เหนือทุกอย่าง
  );
}

export default Popup;
