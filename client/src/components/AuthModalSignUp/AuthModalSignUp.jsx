import React, { useState } from 'react'
import "./AuthModalSignUp.scss"
import closeIcon from "../../assets/icons/cross.png"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import error from "../../assets/icons/error.svg"

function AuthModalSignUp({setShowSignUpModal, setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  const register = async () => {
    axios
      .post("http://localhost:8080/users/", {
        email, password
      })
      .then((res) => {
        setUser(res.data)
        setShowSignUpModal(false)
        navigate("/start")
        console.log(res.data)
      })
  }

  const isInputValid = () => {
    if(email === "" || password === "" || confirmPassword === "") {
      return false
    }
    if(!isValidEmail(email) || password !== confirmPassword) {
      return false
    }
    else {
      return true
    }
  }

  const handleClick = () => {
    setShowSignUpModal(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isInputValid()){
      register();
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
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  return (
      <div className='auth'>
        <button className='auth__btn' onClick={handleClick}>
          <img className='auth__btn-img' src={closeIcon} alt="close icon" />
        </button>
        <div className='auth__container'>
          <h1 className='auth__title'>CREATE A NEW ACCOUNT</h1>
        </div>
        <div className='auth__form-container'>
          <form className='auth__form' onSubmit={handleSubmit}>
            <label className='auth__label' htmlFor="email">EMAIL</label>
            <input className={`auth__input ${!email && isSubmitted ? "error" : ""}`} type="text" onChange={handleEmailChange} id='email' name='email' value={email} placeholder='Enter your email'/>
              <div className="auth__error-container">
                <div
                  className={`auth__error-box ${
                    (!email || !isValidEmail(email)) && isSubmitted ? "" : "none"
                  }`}
                >
                  <img
                    className="auth__error-icon"
                    src={error}
                    alt="error icon"
                  />
                  <span className="auth__error-message">
                    {!email ? "This field is required" : !isValidEmail(email) ? "Please enter a valid email address" : ""}
                  </span>
                </div>
              </div>
            <label className='auth__label' htmlFor="password">PASSWORD</label>
            <input className={`auth__input ${!password && isSubmitted ? "error" : ""}`} type="password" onChange={handlePasswordChange} id='password' name='password' autoComplete='off' value={password} placeholder='Enter your password'/>
              <div className="auth__error-container">
                <div
                  className={`auth__error-box ${
                    (!password || password !== confirmPassword) && isSubmitted ? "" : "none"
                  }`}
                >
                  <img
                    className="auth__error-icon"
                    src={error}
                    alt="error icon"
                  />
                  <span className="auth__error-message">
                    {!password ? "This field is required" : password !== confirmPassword ? "Passwords do not match" : ""}
                  </span>
                </div>
              </div>
            <label className='auth__label' htmlFor="confirm-password">CONFIRM PASSWORD</label>
            <input className={`auth__input ${!confirmPassword && isSubmitted ? "error" : ""}`} type="password" onChange={handleConfirmPasswordChange} id='confirm-password' name='confirm-password' autoComplete='off' value={confirmPassword} placeholder='Confirm password'/>
              <div className="auth__error-container">
                <div
                  className={`auth__error-box ${
                    (!confirmPassword || password !== confirmPassword) && isSubmitted ? "" : "none"
                  }`}
                >
                  <img
                    className="auth__error-icon"
                    src={error}
                    alt="error icon"
                  />
                  <span className="auth__error-message">
                    {!confirmPassword ? "This field is required" : password !== confirmPassword ? "Passwords do not match" : ""}
                  </span>
                </div>
              </div>
            <button className='auth__submit' type='submit' >SUBMIT</button>
          </form>
        </div>
      </div>
  ) 
}

export default AuthModalSignUp