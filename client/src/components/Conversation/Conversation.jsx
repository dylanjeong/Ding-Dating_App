import React, { useState, useEffect } from 'react'
import "./Conversation.scss"
import axios from 'axios'

function Conversation({conversation, user}) {
  const [otherUser, setOtherUser] = useState({})
  useEffect(() => {
    const otherUserId = conversation.members.find((member) => member !== user._id);
    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8080/users/" + otherUserId);
        setOtherUser(res.data);
      } catch (error) {
        console.error('Error fetching other user:', error);
      }
    }
    getUser();
  }, [user, conversation])

  // useEffect(() => { {
  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8080/messages/" + conversation._id);
  //       const messages = res.data;
        
  //       if (messages && messages.length > 0) {
  //         const lastMessage = messages[messages.length - 1];
  //         setRecentMessage(lastMessage);
  //       } else {
  //         console.log("No messages available.");
  //       }
        
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   }
  //   getMessages();}
  // }, [conversation])

  return (
    <div className='conversation'>
      <div className='conversation__img-container'>
        <img className='conversation__img' src={otherUser.img_url} alt={`${otherUser.first_name} profile picture`} />
      </div>
      <div className='conversation__preview'>
        <p className='conversation__name'>{otherUser.first_name}</p>
        {/* <p className='conversation__preview-conversation'>{recentMessage.text}</p> */}
      </div>
    </div>
  )
}

export default Conversation