import React from "react";
import PopupWithForm from './PopupWithForm';
import registerSuccess from '../images/yes.svg'
import registerFail from '../images/fail.svg'

export default function InfoTooltip({isOpen, onClose, success}) {

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
        {success ? 
          <div className="popup__register">
            <img src={registerSuccess} alt="Регистрация: успех"/>
            <h1 className="popup__title">Вы успешно зарегистрировались</h1>
          </div> :
          <div className="popup__register">
             <img src={registerFail} alt="Регистрация: ошибка"/>
             <h1 className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</h1>
          </div>
        }
    </PopupWithForm>
  )
} 