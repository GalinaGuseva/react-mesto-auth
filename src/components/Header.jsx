import React from "react";
import logo from "../images/logo.svg";
import {Route, Link} from 'react-router-dom';

export default function Header({isLoggedIn, onSignOut, userEmail}) {
  
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      <div className="header__menu">        
                {isLoggedIn &&
                <>
                    <p className="header__email">{userEmail}</p>
                    <Link to="/" className="header__link" onClick={onSignOut}>Выйти</Link>
                </>
                }
                <Route path="/signin">
                    <Link to="/signup" className="header__link">Регистрация</Link>
                </Route>
                <Route path="/signup">
                    <Link to="/signin" className="header__link">Войти</Link>
                  </Route>
            </div>      
    </header>
  );
}