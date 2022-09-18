import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup photo-popup ${card.name && "popup_opened"}`}>
      <figure className="photo-popup__container">
        <img src={card.link} alt={card.name} className="photo-popup__image" />
        <figcaption className="photo-popup__caption">{card.name}</figcaption>
        <button
          type="button"
          className="popup__btn-close"
          title="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}
