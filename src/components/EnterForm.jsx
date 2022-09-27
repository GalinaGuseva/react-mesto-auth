import React from 'react';
import {Link} from 'react-router-dom';
import { useForm } from '../hooks/UseForm';

export default function EnterForm({name, title, buttonTitle, regText, regLink, onSubmit}) {

    const initValues = { emailInput: "", passwordInput: "" };
    const { values, setValues, handleChange } = useForm(initValues);
    
    function handleSubmit(e) {
        e.preventDefault();
        //const { email, password } = values;        
        onSubmit({email: values.emailInput, password: values.passwordInput})
           .then(() => {
            setValues(initValues);
           })
           .catch((err) => {console.log(`Ошибка ${err}`)})
        }
    
    return (
        <form onSubmit={handleSubmit} name={name} className="enter">
            <h2 className="enter__title">{title}</h2>
            <input
                value={values.emailInput}
                onChange={handleChange}
                name="emailInput"
                type="email"
                className="enter__input"
                placeholder="email@mail.com"
                required/>
             <input
                value={values.passwordInput}
                onChange={handleChange}
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