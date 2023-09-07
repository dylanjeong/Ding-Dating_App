import React, { useState, useEffect, useRef } from 'react'
import ChatSideBar from '../../components/ChatSideBar/ChatSideBar'
import Chat from '../../components/Chat/Chat'
import "./ChatPage.scss"
import axios from 'axios'
import {io} from "socket.io-client"
import VideoCall from '../../components/VideoCall/VideoCall'

function ChatPage() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [matches, setMatches] = useState([]);
  const [matchesInfo, setMatchesInfo] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [video, setVideo] = useState(false);
  const socket = useRef();
  
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      console.log("users " + users)
    });
  }, [user]);

  const getMatches = async (id) => {
    const res = await axios.get(`http://localhost:8080/users/${id}`);
    setMatches(res.data.matches);
  };

  const getMatchesInfo = async (id) => {
    const res = await axios.get(`http://localhost:8080/users/${id}`);
    return res.data;
  };

  useEffect(() => {
    getMatches(user._id);
  }, []);

  useEffect(() => {
    const fetchMatchesInfo = async () => {
      const promises = matches.map(match => getMatchesInfo(match));
      const data = await Promise.all(promises);
      setMatchesInfo(data);
    };

    if (matches.length > 0) {
      fetchMatchesInfo();
    }
  }, [matches]);

  return (
    <>
      <section className='chat-page'>
        <ChatSideBar setCurrentChat={setCurrentChat} user={user} setMatchesInfo={setMatchesInfo} matchesInfo={matchesInfo}/>
        <Chat currentChat={currentChat} user={user} socket={socket} setVideo={setVideo}/>
        {
          video && <VideoCall currentChat={currentChat} setVideo={setVideo}/>
        }
      </section>
    </>
  );
}

export default ChatPage;
