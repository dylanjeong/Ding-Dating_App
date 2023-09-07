import React from 'react'
import "./Header.scss"
import dingLogo from "../../assets/icons/bell.png"
import { useNavigate } from 'react-router-dom';

function Header({isLoggedIn, showSignInModal, setShowSignInModal, setLoggedIn}) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogInClick = () => {
    setShowSignInModal(true)
  }
  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/")
  };

  const handleChat = () => {
    navigate("/chat")
  }

  return (
    <nav className='nav'>
      <div className='nav__logo-container'>
        <div className='nav__logos' onClick={() => navigate("/")}>
          <img className='nav__logo-img' src={dingLogo} alt="ding logo" />
          <span className='nav__logo'>DING!</span>
        </div>
        <div className='nav__container'>
          {isLoggedIn ?
          <>
            <div className='nav__profile-img-container'>
              <img className='nav__img' src={user.img_url} alt="profile image" />
            </div>
            <button className='nav__chat-btn' onClick={handleChat}>CHAT</button>
            <button className='nav__login-btn' onClick={handleLogout} disabled={showSignInModal}>LOG OUT</button>
          </> :
          <button className='nav__login-btn' onClick={handleLogInClick} disabled={showSignInModal}>LOG IN</button> 
          }
        </div>
      </div>
    </nav>
  )
}

export default Header