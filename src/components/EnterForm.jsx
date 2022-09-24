import React, {useState} from 'react';

export default function EnterForm({name, title, buttonTitle, onSubmit}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({email, password});
    }

    return (
        <form onSubmit={handleSubmit} name={name} className="enter">
            <h2 className="enter__title">{title}</h2>
            <input
                value={email}
                onChange={handleEmailChange}
                name="email-input"
                type="email"
                className="enter__input"
                placeholder="Email"
                required/>
             <input
                value={password}
                onChange={handlePasswordChange}
                name="password-input"
                type="password"
                className="enter__input"
                placeholder="Пароль"
                required />         
            <button type="submit"
                    className="enter__submit-btn">{buttonTitle}</button>
        </form>
    )
}