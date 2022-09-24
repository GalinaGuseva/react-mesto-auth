import React from "react";
import registerSuccess from '../images/yes.svg'
import registerFail from '../images/fail.svg'

export default function InfoTooltip({isOpen, onClose, isSuccess}) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>        
        <figure className="popup__container">
          <button
          type="button"
          className="popup__btn-close"
          title="Закрыть"
          onClick={onClose}
        ></button>
        {isSuccess ? 
        <div>
          <img src={registerSuccess} alt="Регистрация: успех" className="popup__image"/>
            <figcaption className="popup__title popup__title_info">Вы успешно зарегистрировались</figcaption>
             </div>
          :   <div>
             <img src={registerFail} alt="Регистрация: ошибка" className="popup__image"/>
             <figcaption className="popup__title popup__title_info">Что-то пошло не так! Попробуйте ещё раз.</figcaption>        
             </div>}
        </figure>
    </div>
  )
} 