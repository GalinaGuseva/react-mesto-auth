import React from 'react';
import {Link} from 'react-router-dom';
//import { useForm } from '../hooks/UseForm';

export default function EnterForm({name, title, buttonTitle, regText, regLink, onEnterSubmit}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onEnterSubmit({email, password});
    }
    return (
        <form onSubmit={handleSubmit} name={name} className="enter">
            <h2 className="enter__title">{title}</h2>
            <input
                value={email}
                onChange={handleEmailChange}
                name="emailInput"
                type="email"
                className="enter__input"
                placeholder="email@mail.com"
                required/>
             <input
                value={password}
                onChange={handlePasswordChange}
                name="passwordInput"
                type="password"
                className="enter__input"
                placeholder="••••••••••"
                required />         
            <button type="submit"
                className="enter__submit-btn">{buttonTitle}</button>                
        <p className="enter__text">{regText}<Link to='/signin' className='enter__link'>{regLink}</Link></p>
               
        </form>
    )
}