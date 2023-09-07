import React, { useState } from 'react'
import "./StartPage.scss"
import error from "../../assets/icons/error.svg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function StartPage({user}) {
  const navigate = useNavigate();
  const [isSubmitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    email: "",
    birthday: "",
    birthmonth: "",
    birthyear: "",
    show_gender: true,
    gender: "",
    gender_interest: "",
    about: "",
    img_url: ""
  })
  const isInputValid = () => {
    return (
      data.first_name !== "" &&
      data.about !== "" &&
      data.img_url !== "" &&
      data.birthday !== "" &&
      data.birthmonth !== "" &&
      data.birthyear !== "" &&
      data.gender !== "" &&
      data.gender_interest !== ""
    );
  };
  const updateInfo = () => {
    axios
      .patch(`http://localhost:8080/users/${user.userID}`, data)
      .then((res) => {
        navigate("/")
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prev) => ({
      ...prev,
      [name] : value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    setSubmitted(true);
    if (isInputValid) {
      updateInfo();
      console.log("successful")
    }
  }
  return (
    <main className='start'>
      <div className='start__title'>
        <h1>CREATE A NEW ACCOUNT</h1>
      </div>
        <form className='start__form' onSubmit={handleSubmit}>
          <section className='start__form-first'>
            <div className='start__first-half'>
              <label className='start__label' htmlFor="">First Name</label>
              <input className={`start__input start__name-input ${!data.first_name && isSubmitted ? "error" : ""}`} name='first_name' onChange={handleChange} type='text' value={data.first_name} placeholder='FIRST NAME'></input>
                <div className="start__error-container">
                  <div
                    className={`start__error-box ${
                      !data.first_name && isSubmitted ? "" : "none"
                    }`}
                  >
                    <img
                      className="start__error-icon"
                      src={error}
                      alt="error icon"
                    />
                    <span className="start__error-message">
                      This field is required
                    </span>
                  </div>
                </div>

                <div className='start__profile-img'>
                  <label className='start__label' htmlFor="">Profile Image</label>
                  <input className={`start__input start__img-input ${!data.img_url && isSubmitted ? "error" : ""}`} name="img_url" onChange={handleChange} value={data.img_url} type='text' placeholder='URL'></input>
                    <div className="start__error-container">
                      <div
                        className={`start__error-box ${
                          !data.img_url && isSubmitted ? "" : "none"
                        }`}
                      >
                        <img
                          className="start__error-icon"
                          src={error}
                          alt="error icon"
                        />
                        <span className="start__error-message">
                          This field is required
                        </span>
                      </div>
                    </div>
                </div>

              <label className='start__label'>ABOUT ME</label>
              <input className={`start__input start__about-input ${!data.about && isSubmitted ? "error" : ""}`} name='about' onChange={handleChange} value={data.about} type='text' placeholder='ABOUT ME'></input>
                <div className="start__error-container">
                  <div
                    className={`start__error-box ${
                      !data.about && isSubmitted ? "" : "none"
                    }`}
                  >
                    <img
                      className="start__error-icon"
                      src={error}
                      alt="error icon"
                    />
                    <span className="start__error-message">
                      This field is required
                    </span>
                  </div>
                </div>
            </div>
            <div className='start__container'>
              <p className='start__label '>PREVIEW YOUR PICTURE</p>
              <div className='start__img-container'>
                <img className='start__img' src={data.img_url ? `${data.img_url}` : "https://images.unsplash.com/photo-1530954979821-95eba64037a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"} alt="" />
              </div>
            </div>
            </section>

            <label className='start__label'>BIRTHDAY</label>
            <div className='start__birthday'>
              <input className={`start__input start__birthday-input ${!data.birthmonth && isSubmitted ? "error" : ""}`} type='number' min="1" max="12" id='birthmonth' onChange={handleChange} name='birthmonth' value={data.birthmonth} placeholder='MONTH'></input>
              <input className={`start__input start__birthday-input ${!data.birthday && isSubmitted ? "error" : ""}`} type='number' min="1" max="31" id='birthday' onChange={handleChange} name='birthday' value={data.birthday} placeholder='DAY'></input>
              <input className={`start__input start__birthday-input ${!data.birthyear && isSubmitted ? "error" : ""}`} type='number' min="1900" max="2023" id='birthyear' onChange={handleChange} name='birthyear' value={data.birthyear} placeholder='YEAR'></input>
            </div>
                    <div className="start__error-container">
                      <div
                        className={`start__error-box ${
                          (!data.birthday || !data.birthmonth || !data.birthyear) && isSubmitted ? "" : "none"
                        }`}
                      >
                        <img
                          className="start__error-icon"
                          src={error}
                          alt="error icon"
                        />
                        <span className="start__error-message">
                          This field is required
                        </span>
                      </div>
                    </div>
            <label className='start__label'>GENDER</label>
            <div className='start__gender'>
              <input name='gender' type="radio" id='gender-man' onChange={handleChange} value={"man"}/> 
              <label className='start__radio-label' htmlFor="gender-man">MAN</label>
              <input name='gender'type="radio" id='gender-woman' onChange={handleChange} value={"woman"}/> 
              <label className='start__radio-label' htmlFor="gender-woman">WOMAN</label>
              <input name='gender' type="radio" id='gender-everyone' onChange={handleChange} value={"everyone"}/> 
              <label className='start__radio-label' htmlFor="gender-everyone">EVERYONE</label>
            </div>
            <div className="start__error-container">
              <div
                className={`start__error-box ${
                  !data.gender && isSubmitted ? "" : "none"
                }`}
              >
                <img
                  className="start__error-icon"
                  src={error}
                  alt="error icon"
                />
                <span className="start__error-message">
                  This field is required
                </span>
              </div>
            </div>
            <label className='start__label'>SHOW ME</label>
            <div className='start__gender-pref'>
              <input name='gender_interest' type="radio" onChange={handleChange} id='gender-pref-man' value={"man"}/> 
              <label className='start__radio-label' htmlFor="gender-pref-man">MAN</label>
              <input name='gender_interest'type="radio" onChange={handleChange} id='gender-pref-woman' value={"woman"}/> 
              <label className='start__radio-label' htmlFor="gender-pref-woman">WOMAN</label>
              <input name='gender_interest' type="radio" onChange={handleChange} id='gender-pref-everyone' value={"everyone"}/> 
              <label className='start__radio-label' htmlFor="gender-pref-everyone">EVERYONE</label>
            </div>
            <div className="start__error-container">
              <div
                className={`start__error-box ${
                  !data.gender_interest && isSubmitted ? "" : "none"
                }`}
              >
                <img
                  className="start__error-icon"
                  src={error}
                  alt="error icon"
                />
                <span className="start__error-message">
                  This field is required
                </span>
              </div>
            </div>
        <button className='start__submit-btn' type='submit'>START</button>
        </form>
    </main>
  )
}

export default StartPage