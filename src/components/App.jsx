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
  const [isLoggedIn, setLoggedIn] = useState(false); 
  const [userEmail, setUserEmail] = useState('');

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
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if (res.data.email) {                     
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
            getData();  
          }
        })
        .catch(err => { console.log(err); })
    }
  }, []);

 // Вход в аккаунт
function handleLogin({email, password}) {
    auth.login({email, password})
      .then((res) => {
        if (res.token) {  
          setUserEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/');              
          getData();
        }
      })
       .catch((err) => {
          console.log(err); 
          setLoggedIn(false);            
          setIsInfoPopupOpen(true);
    })
}

function handleRegister({email, password}) {
    auth.register({email, password})
        .then(() => {
          history.push('/signin');
          setIsInfoPopupOpen(true);
        })
        .catch(() => {
          console.log(err); 
          setIsInfoPopupOpen(true);
        })
}

function handleSignOut() {
    auth.signOut()
        .then(() => {
           setLoggedIn(false);
           setUserEmail('');
           localStorage.removeItem('jwt');
           history.push('/sign-in');
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
       <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}  
            component={Main} 
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}/>            
        <Route path="/sign-up"> 
           {isLoggedIn ? <Redirect to="/"/> : <Register onSubmit={handleRegister}/>}          
        </Route>
        <Route path="/sign-in">
        {isLoggedIn ? <Redirect to="/"/> : <Login onSubmit={handleLogin}/>}         
        </Route>      
        <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
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
            isSuccess={isInfoTooltipSuccess}
          />        
      </Switch>
      <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
