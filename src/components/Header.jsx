import React from "react";
import logo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";

export default function Header({isLoggedIn, onSignOut, email}) {
   return (
    <header className="header">   
      <img src={logo} alt="лого" className="header__logo" />
      <div className="header__menu">
      <Switch>
      {isLoggedIn &&
                <>
        <p className="header__email">{email} <Link to='/signin' className="header__link" onClick={onSignOut}>Выйти</Link></p>         
        </>
                }
      <Route exact path="/signin">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
      </Route>
      <Route exact path="/signup">
          <Link to="/signin" className="header__link">
            Войти
          </Link>
      </Route>        
      </Switch>
      </div>
      </header>    
  );
}



  
  
   
              
               
                
                
   