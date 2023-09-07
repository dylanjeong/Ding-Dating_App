import React from 'react'
import Lottie from 'react-lottie'
import animation from "../../assets/images/ding-main.json"
import "./Matched.scss"

function Matched() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className='matched'>
      <Lottie 
        options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  )
}

export default Matched