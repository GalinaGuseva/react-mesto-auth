import React from "react";
import logo from "../images/logo.svg";

export default function Header({title, link, email, onSignOut}) {
  function ShowEmail() {
    if (email) {
      return (
        <>
        <p className="header__email">{email}</p>
        <button className="header__title" onClick={onSignOut}>Выйти</button>
        </>
      )
    } else {
      return <> </>
    }
  }
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      <a className="header__title" href={link}>{title}</a>
        <ShowEmail
          email={email}
        />
    </header>
  );
}