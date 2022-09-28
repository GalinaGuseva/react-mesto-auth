import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

export default function Header({isLoggedIn, onSignOut, email}) {
   return (
    <header className="header">   
      <img src={logo} alt="лого" className="header__logo" />
      <div className="header__menu">
      <Routes>
      <Route exact path="/" element = {                  
        isLoggedIn && <p className="header__email">{email} <Link to='/signin' className="header__link" onClick={onSignOut}>Выйти</Link></p>         
      }
      />
      <Route path="/signin" element = {
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>}
       />
      <Route path="/signup" element = {
          <Link to="/signin" className="header__link">
            Войти
          </Link>}
       />        
      </Routes>
      </div>
      </header>    
  );
}



  
  
   
              
               
                
                
   