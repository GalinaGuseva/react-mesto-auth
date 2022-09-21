import React from '.react';
import {Link} from 'react-router-dom';

export default function Register(props) {
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


    return(
        <div className="enter">
      <h1 className="enter__title">Регистрация</h1>
      <form
        className="enter__form"
        action="/"
        name="reg"
        noValidate 
        onSubmit={handleSubmit}         
      >
        <input
          className="enter__input"
          name="name"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          className="enter__input"
          name="password"
            type="password"
            placeholder="Пароль"
            value={password}
          onChange={handleChange}
            required
        />
        <button
           className="enter__submit-btn"
           type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='enter__field'>
        <p className="enter__subtitle">
          Уже зарегистрированы? 
        <Link to="/sign-in" className="enter__link">
          Войти
        </Link>
        </p>
      </div>

    </div>
  )
}   