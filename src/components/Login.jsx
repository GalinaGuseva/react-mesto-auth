import React from 'react';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = e => {
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.onLogin({ email, password });
  }

  return (
    <form className="enter" action="/" onSubmit={handleSubmit} noValidate >
      <h2 className="enter__title">Вход</h2> 
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
        <button type="submit" className="enter__submit-btn">Войти</button>
      </form>    
  )
}
