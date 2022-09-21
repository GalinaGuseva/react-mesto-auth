import React from '.react';

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


    return(
        <div className="enter">
        <h1 className="enter__title">Вход</h1>
        <form
          className="enter__form"
          action="/"
          name="login"
          onSubmit={handleSubmit} 
          noValidate        
        >
          <input
            value={email}
            onChange={handleChange}
            className="enter__input"
            name="email"
            type="text"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={handleChange}
            className="enter__input"
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />
          <button
            className="enter__submit_btn"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    )
}