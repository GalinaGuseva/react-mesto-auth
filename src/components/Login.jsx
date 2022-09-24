import React from '.react';
import EnterForm from './EnterForm';

export default function Login(onSubmit) {

    return (
        <div className="page">
            <EnterForm
                name="login"
                onSubmit={onSubmit}
                title="Войти"
                buttonTitle="Войти"
            />
        </div>
    )
}
