import React from 'react';
import EnterForm from './EnterForm';

export default function Login(onEnterSubmit) {

    return (
        <div className="page">
            <EnterForm
                name="login"
                onEnterSubmit={onEnterSubmit}
                title="Вход"
                buttonTitle="Войти"               
            />
        </div>
    )
}
