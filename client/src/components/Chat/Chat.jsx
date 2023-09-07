import React, { useEffect, useState } from 'react'
import "./Chat.scss"
import ChatDisplay from '../ChatDisplay/ChatDisplay'
import videoIcon from '../../assets/icons/videocam.png'
import axios from 'axios'

function Chat({currentChat, user, socket, setVideo}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherMessage, setOtherMessage] = useState({});
  const [overLimit, setOverLimit] = useState(false);
  const myMessages = messages.filter(message => message.sender === user._id);

  if(messages) {
    useEffect(() => {
      if (myMessages.length > 15) {
        setOverLimit(true);
      } else {
        setOverLimit(false);
      }
    }, [messages])
  }
  const textHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversation_id: currentChat?._id
    };

    socket.current?.emit("sendMessage", {
      senderId: user?._id,
      receiverId: currentChat?.members.find((member) => member !== user._id),
      text: newMessage
    });

    try {
      const res = await axios.post("http://localhost:8080/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      const messageListener = (data) => {
        setOtherMessage({
          conversation_id: currentChat?._id,
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now()
        });
      };

      socket.current.on("getMessage", messageListener);

      return () => {
        socket.current.off("getMessage", messageListener);
      };
    }
  }, []);

  useEffect(() => {
    otherMessage && currentChat?.members.includes(otherMessage.sender) &&
      setMessages(prev => [...prev, otherMessage]);
  }, [otherMessage, currentChat]);

  return (
    <div className='chat'>
      <ChatDisplay currentChat={currentChat} user={user} messages={messages} setMessages={setMessages}/>
      <div className='chat__input-container'>
        <div className='chat__button-container'>
          <button className='chat__button' onClick={()=>setVideo(true)}>
            <img className='chat__button-img' src={videoIcon} alt="video icon" />
          </button>
        </div>
        <form id="textInput" className='chat__input-form' onSubmit={handleSubmit}>
          <input className='chat__input' disabled={overLimit} onChange={textHandler} value={newMessage} name="chat" id="chat" cols="30" rows="10" placeholder={overLimit ? `START THE VIDEO CHAT NOW` : `YOU CAN SEND ${15 - myMessages.length} MORE TEXTS`}/>
        </form>
        <button form='textInput' type='submit' className='chat__send-btn' disabled={overLimit}>SEND</button>
      </div>
    </div>
  )
}

export default Chat