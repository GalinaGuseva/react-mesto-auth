import React from 'react';
import EnterForm from './EnterForm';

export default function Register({onEnterSubmit}) {

    return (
        <div className='register'>
            <EnterForm
                name='register'
                onEnterSubmit={onEnterSubmit}
                title='Регистрация'
                buttonTitle='Зарегистрироваться'
                regText='Уже зарегистрированы? '
                regLink = 'Войти'
            />            
        </div>

    );
} 