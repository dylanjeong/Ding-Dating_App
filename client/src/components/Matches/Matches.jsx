import React, { useState } from "react";
import "./Matches.scss";
import axios from "axios";

function Matches({ user, matchesInfo, conversations, fetchConversations, setCurrentChat }) {
  const conversationIds = conversations.flatMap(conversation =>
    conversation.members
  );
  
  const filteredMatches = matchesInfo.filter(match =>
    !conversationIds.includes(match._id)
  );

  const startConversation = async (selectedId) => {
    try {
      const response = await axios.post("http://localhost:8080/conversations", {
        senderId: user._id,
        receiverId: selectedId,
      });
      setCurrentChat(response.data)
      fetchConversations();
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const handleClick = (match) => () => {
    startConversation(match._id);
  };

  return (
    <div className="matches">
      {filteredMatches.map(match => (
        <div
          className="matches__profile"
          key={match._id}
          onClick={handleClick(match)}
        >
          <img
            className="matches__profile-img"
            src={match.img_url}
            alt="profile image"
          />
          <p className="matches__profile-name">{match.first_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Matches;
