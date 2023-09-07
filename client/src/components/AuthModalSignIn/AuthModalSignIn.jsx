import React, { useState } from 'react'
import closeIcon from "../../assets/icons/cross.png"
import "./AuthModalSignIn.scss"
import error from "../../assets/icons/error.svg"
import axios from "axios";
import { useNavigate } from "react-router-dom"

function AuthModalSignIn({setShowSignInModal, setLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  const login = () => {
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setShowSignInModal(false)
        setLoggedIn(true)
        navigate("/dashboard")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isInputValid = () => {
    if(email === "" || password === "") {
      return false
    }
    if(!isValidEmail(email)) {
      return false
    }
    else {
      return true
    }
  }

  const handleClick = () => {
    setShowSignInModal(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isInputValid()){
      login();
      console.log("successful")
    } else {
      console.log("unsuccessful")
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
      <div className='signin'>
        <button className='signin__btn' onClick={handleClick}>
          <img className='signin__btn-img' src={closeIcon} alt="close icon" />
        </button>
        <div className='signin__container'>
          <h1 className='signin__title'>LOG IN</h1>
        </div>
        <div className='signin__form-container'>
          <form className='signin__form' onSubmit={handleSubmit}>
            <label className='signin__label' htmlFor="email">EMAIL</label>
            <input className={`signin__input ${!email && isSubmitted ? "error" : ""}`} type="text" onChange={handleEmailChange} id='email' value={email} placeholder='Enter your email'/>
              <div className="signin__error-container">
                <div
                  className={`signin__error-box ${
                    (!email || !isValidEmail(email)) && isSubmitted ? "" : "none"
                  }`}
                >
                  <img
                    className="signin__error-icon"
                    src={error}
                    alt="error icon"
                  />
                  <span className="signin__error-message">
                    {!email ? "This field is required" : !isValidEmail(email) ? "Please enter a valid email address" : ""}
                  </span>
                </div>
              </div>
            <label className='signin__label' htmlFor="password">PASSWORD</label>
            <input className={`signin__input ${!password && isSubmitted ? "error" : ""}`} type="password" onChange={handlePasswordChange} autoComplete='off' value={password} placeholder='Enter your password'/>
              <div className="signin__error-container">
                <div
                  className={`signin__error-box ${
                    !password && isSubmitted ? "" : "none"
                  }`}
                >
                  <img
                    className="signin__error-icon"
                    src={error}
                    alt="error icon"
                  />
                  <span className="signin__error-message">
                    This field is required
                  </span>
                </div>
              </div>
            <button className='signin__submit' type='submit' >SUBMIT</button>
          </form>
        </div>
      </div>

  ) 
}
export default AuthModalSignIn