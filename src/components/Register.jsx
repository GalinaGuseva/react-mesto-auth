import React from '.react';
import {Link} from 'react-router-dom';
import EnterForm from "./EnterForm";

export default function Register({onSubmit}) {

    return (
        <div className="register">
            <EnterForm
                name="register"
                onSubmit={onSubmit}
                title="Регистрация"
                buttonTitle="Зарегистрироваться"
            />
            <p className="enter__text">Уже зарегистрированы? <Link to="/signin" className="enter__link">Войти</Link></p>
        </div>

    );
} 