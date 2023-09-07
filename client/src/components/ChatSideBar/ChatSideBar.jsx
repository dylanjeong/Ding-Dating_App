import React, { useState, useEffect } from 'react'
import Matches from '../Matches/Matches'
import ChatHistory from '../ChatHistory/ChatHistory'
import "./ChatSidebar.scss"
import axios from 'axios'

function ChatSideBar({user, matchesInfo, setCurrentChat, messages}) {
  const [conversations, setConversations] = useState([]);
  const fetchConversations = async () => {
    try{
      const res = await axios.get(`http://localhost:8080/conversations/${user._id}`); 
      setConversations(res.data);
    } catch(error) {
      console.error('Error fetching conversations:', error);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, [])
  return (
    <div className='chat-sidebar'>
      <p className='chat-sidebar__title'>MATCHES</p>
      <Matches fetchConversations={fetchConversations} matchesInfo={matchesInfo} user={user} conversations={conversations} setCurrentChat={setCurrentChat}/>
      <p className='chat-sidebar__title'>CONVERSTAIONS</p>
      <ChatHistory user={user} messages={messages} setCurrentChat={setCurrentChat} conversations={conversations} setConversations={setConversations}/>
    </div>
  )
}

export default ChatSideBar