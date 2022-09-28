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
  const [email, setEmail] = React.useState('');  
  const [isSuccess, setIsSuccess] = React.useState(false);
  const history = useHistory();
  
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);


  React.useEffect(() => {
    const tockenCheck = () => {
      if(!localStorage.getItem('jwt')) return;
    const jwt = localStorage.getItem('jwt');
    auth.getContent(jwt).then((res) => {
      if(res) {
        setLoggedIn(true);
        history.push('/');
        setEmail(res.data.email);                
      }
    })
  }
    tockenCheck();    
  }, [history]);
 
const handleLogin = (data) => {
   return auth.login(data)
      .then((data) => {
        if(!data.token) return;
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);            
     })
       .catch((err) => {
          console.log(err); 
          setLoggedIn(false); 
      })
}

const handleRegister = (data) => {
  auth.register(data)
    .then(res => {
      if(res) {               
        setIsSuccess(true);                               
      }
    })
    .catch(err => {
      console.log(err);
      setIsSuccess(false);     
    })
    .finally(() => setIsInfoPopupOpen(true));
}

function handleSignOut() {
  localStorage.removeItem("jwt");
  setLoggedIn(false);
  history.push('/signin');     
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
       <Header onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          email={email} />
       <Switch>
       <Route path="/signin">
            {isLoggedIn ? <Redirect to="/"/> : <Login onLogin={handleLogin}/>}         
        </Route>            
        <Route path="/signup"> 
           {isLoggedIn ? <Redirect to="/"/> : <Register onRegister={handleRegister}/>}          
        </Route>          
        <Route path="/" element = {
          <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>  
           { <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            /> 
           }             
          </ProtectedRoute>
        }>            
        </Route> 
        
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
            isSuccess={isSuccess}
          />
        </Switch>
        <Footer />        
    </CurrentUserContext.Provider>
  );
}

export default App;
