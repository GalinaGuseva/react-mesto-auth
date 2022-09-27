import React from 'react';
import {Link} from 'react-router-dom';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = e => {
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.onRegister({ email, password });
    setEmail('');
    setPassword('');
  }

  return (     
      <form action="/" name="register" className="enter" noValidate onSubmit={handleSubmit}>
        <h2 className="enter__title">Регистрация</h2>
        <input type="email"
          name="email"
          placeholder="email@mail.com"
          className="enter__input"
          minLength="5"
          maxLength="20"
          required
          value={email}
          onChange={handleChange}/>
        <input type="password"
          name="password"
          placeholder="••••••••••"
          className="enter__input" 
          minLength="5"
          maxLength="20"
          required
          value={password}
          onChange={handleChange}/>
        <button type="submit" className="enter__submit-btn">Зарегистрироваться</button>
        <p className="enter__text">Уже зарегистрированы?  <Link to='/signin' className='enter__link'>Войти</Link></p>        
      </form>  
  )
}