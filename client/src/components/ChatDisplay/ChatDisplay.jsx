import React, { useState, useEffect, useRef } from 'react'
import "./ChatDisplay.scss"
import Message from '../Message/Message'
import ring from "../../assets/images/ding-main.json"
import Lottie from 'react-lottie'
import axios from 'axios'

function ChatDisplay({currentChat, user, messages, setMessages}) {
  const [otherUser, setOtheruser] = useState({})
  const scrollRef = useRef();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ring,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    if (currentChat?._id) {
      const getMessages = async () => {
        try {
          const res = await axios.get("http://localhost:8080/messages/" + currentChat?._id);
          setMessages(res.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
      getMessages();}
    }, [currentChat])

  useEffect(() => {
    if (currentChat?.members) {
    const getOtherUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/users/${currentChat?.members.find((member) => member !== user._id)}`);
        setOtheruser(res.data);
      } catch (error) {
        console.error('Error fetching other user:', error);
      }
    }
    getOtherUser();}
  }, [currentChat])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className='chat-display' ref={scrollRef}>
        {
          currentChat ? 
        <>
          {messages.map((message) => (
            <div key={message._id} className='chat-display__message-wrapper'>
              <Message message={message} user={user} otherUser={otherUser}/>    
            </div>
          ))}
        </> 
        :
        <div className='chat-display__default-container'>
          <Lottie 
            options={defaultOptions}
            height={200}
            width={200}
          />
          <p className='chat-display__default-line'>START A CONVERSATION WITH YOUR MATCHES!</p>
        </div> 
         }
      </div>
    </>
  )
}

export default ChatDisplay