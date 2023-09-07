import React from 'react'
import "./VideoPlayer.scss"
import Webcam from "react-webcam"
function VideoPlayer() {
  return (
    <div className='video-player'>
      <div className='video-player__other-video'>
        <Webcam className='video-player__cam' mirrored={true} audio={false}/>
        <div className='video-player__my-video'>
          <Webcam className='video-player__cam' mirrored={true} audio={false}/>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer