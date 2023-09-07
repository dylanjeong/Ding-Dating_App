import React from "react"
import "./VideoCall.scss"
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import phone from "../../assets/icons/phone.png"

function VideoCall({currentChat, setVideo}) {
  return (
    <div className='video-call'>
      <div className='video-call__container'>
        <VideoPlayer />
        <button className="video-call__button" onClick={() => setVideo(false)}>
          <img className="video-call__img" src={phone} alt="phone" />
        </button>
      </div>
    </div>
  )
}

export default VideoCall