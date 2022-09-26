import React from 'react';
import api from '../utils/Api.js';
import {Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/Auth';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'One moment...',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    alt: '',
  });
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);  
  const [isLoggedIn, setLoggedIn] = React.useState(false); 
  const [userEmail, setUserEmail] = React.useState('');
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const history = useHistory();

  const getData = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  };

  // Проверка токена и авторизация пользователя
  React.useEffect(() => {
    const tockenCheck = () => {
      if(!localStorage.getItem('jwt')) return;
    const jwt = localStorage.getItem('jwt');
    auth.getContent(jwt).then((res) => {
      if(res) {
        setLoggedIn(true);
        history.push('/');
        setUserEmail(res.data.email);
        getData();
      }
    })
  }
    tockenCheck();    
  }, []);

 // Вход в аккаунт
const handleLogin = ({email, password}) => {
   return auth.login({email, password})
      .then((data) => {
        if(!data.jwt) return;
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        getData();
        setUserEmail(email);        
      })
       .catch((err) => {
          console.log(err); 
          setLoggedIn(false); 
      })
}

function handleRegister({email, password}) {
    return auth.register({email, password})
        .then(() => {
          history.push('/signin');
          setIsInfoTooltipSuccess(true);          
        })
        .catch((err) => {
          console.log(err); 
          setIsInfoTooltipSuccess(false);          
        })
        .finally(() => setIsInfoPopupOpen(true)); 
}

function handleSignOut() {
    auth.signOut()
        .then(() => {
           setLoggedIn(false);
           setUserEmail('');
           localStorage.removeItem('jwt');
           history.push('/signin');
      })
      .catch((err) => console.log(err));
}  

function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(err));
  }

function handleEditAvatarClick(e) {
    setIsEditAvatarPopupOpen(true);
  }

function handleEditProfileClick(e) {
    setIsEditProfilePopupOpen(true);
  }

function handleAddPlaceClick(e) {
    setIsAddPlacePopupOpen(true);
  }

function handleCardClick(card) {
    setSelectedCard(card);
  }

function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
       <div className="page"> 
       <Header onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail} />
       <Switch>
       <Route path="/signin">
            {isLoggedIn ? <Redirect to="/"/> : <Login onEnterSubmit={handleLogin}/>}         
        </Route>            
        <Route path="/signup"> 
           {isLoggedIn ? <Redirect to="/"/> : <Register onEnterSubmit={handleRegister}/>}          
        </Route>          
        <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route> 
       <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>  
            <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />              
          </ProtectedRoute>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isInfoTooltipSuccess ? true : false}
          /> 
      </Switch>
      <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
