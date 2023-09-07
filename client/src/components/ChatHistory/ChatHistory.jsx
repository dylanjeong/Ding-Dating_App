import React, { useState, useEffect } from 'react'
import "./ChatHistory.scss"
import Conversation from '../Conversation/Conversation'

function ChatHistory({user, setCurrentChat, conversations, setRoomId}) {
  return (
    <div className='chat-history'>
      {conversations.map((conversation) => (
        <div key={conversation._id} onClick={() => {
          setCurrentChat(conversation)
          }}>
          <Conversation conversation={conversation} user={user}/>
        </div>
      ))}
    </div>
  )
}

export default ChatHistory