import React, { useState } from 'react'
import Nav from "../../components/Header/Header"
import AuthModalSignUp from '../../components/AuthModalSignUp/AuthModalSignUp'
import animation from "../../assets/images/animation.json"
import Lottie from "react-lottie"
import {useNavigate} from "react-router-dom"
import "./HomePage.scss"
import AuthModalSignIn from '../../components/AuthModalSignIn/AuthModalSignIn'

function HomePage({ isLoggedIn, showSignUpModal, setShowSignUpModal, showSignInModal, setShowSignInModal, setLoggedIn, setUser }) {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleClick = () => {
    isLoggedIn ? navigate("/dashboard") : setShowSignUpModal(true);
  }

  return (
    <>
      <div className='home'>
        <div className='home__container'>
          <Lottie 
            options={defaultOptions}
            height={550}
            width={550}
          />
          <div>
            <h1 className='home__title'>Start Dinging Your Bell</h1>
            <button className='home__btn' onClick={handleClick}>
              {!isLoggedIn ? "SIGN UP" : "START"}
            </button>
          </div>
        </div>
      </div>

      {(showSignUpModal) &&
        <AuthModalSignUp setShowSignUpModal = {setShowSignUpModal} isLoggedIn={isLoggedIn} setUser={setUser}/>
      }
      {(showSignInModal) &&
        <AuthModalSignIn setShowSignInModal = {setShowSignInModal} setLoggedIn={setLoggedIn}/>
      }
    </>
  )
}

export default HomePage