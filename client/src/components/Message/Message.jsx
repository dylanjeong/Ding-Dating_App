import React, { useState, useEffect } from 'react'
import "./Message.scss"
import { format } from "timeago.js"

function Message({message, user, otherUser}) {
  const [isMine, setIsMine] = useState(true)
  useEffect(() => {
    if (message.sender === user._id) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [message, user]);  

  return (
    <div className={`message ${isMine ? "mine" : ""}`}>
      <div className='message__img-container'>
        <img className='message__img' src={isMine ? `${user.img_url}` : `${otherUser.img_url}`} alt='user' />
      </div>
      <div className='message__wrapper'>
        <div className='message__text-container'>
          <p className='message__text'>{message.text}</p>
        </div>
        <p className='message__time'>{format(message.createdAt)}</p>
      </div>
    </div>
  )
}

export default Message