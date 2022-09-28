import React from 'react';
import api from '../utils/Api.js';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const tockenCheck = () => {
      if(!localStorage.getItem('jwt')) return;
    const jwt = localStorage.getItem('jwt');
    auth.getContent(jwt).then((res) => {
      if(res) {
        setLoggedIn(true);
        navigate('/');
        setEmail(res.data.email);                
      }
    })
  }
    tockenCheck();    
  }, []);
 
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
          setIsInfoPopupOpen(true);
      })
}

const handleRegister = (data) => {  
  auth.register(data)
    .then(res => {
      if(res) {               
        setIsSuccess(true); 
        setEmail(data.email);                             
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
  navigate('/signin');     
}  

React.useEffect(() => {
  if (localStorage.getItem('jwt')) {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      setCards(initialCards);      
    })
    .catch((err) => {      
      console.log(err);
      navigate('/signin')       
    })
    .finally(() => {
      setTimeout(showContent, 2000)
    })
}
}, [isLoggedIn])

const showContent = () => {
setIsLoaded(true)
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

  function handlePopupCloseByOverlay(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleEsc(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard ||
      isInfoPopupOpen
    ) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handlePopupCloseByOverlay);
    }
  });

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    document.removeEventListener("keydown", handleEsc);
    document.removeEventListener("click", handlePopupCloseByOverlay);
  }

  return (
   <CurrentUserContext.Provider value={currentUser}>
       <Header onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          email={email} />            
    <Routes>
       <Route path="/signin" 
       element = {isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin}/>}
        />            
      <Route path="/signup"
        element = {isLoggedIn ? <Navigate to="/" /> : <Register onRegister={handleRegister}/>}          
        />          
      <Route exact path="/" element = {
          <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>  
           <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isLoaded={ isLoaded }
            />              
          </ProtectedRoute>
        }/>            
     </Routes>        
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
            isOpen={ isInfoPopupOpen }
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />        
      <Footer />        
    </CurrentUserContext.Provider>
  );
}

export default App;
