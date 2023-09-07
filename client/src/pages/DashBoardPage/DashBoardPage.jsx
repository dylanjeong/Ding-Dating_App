import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import "./DashBoardPage.scss"
import heart from "../../assets/images/heart.png"
import dislike from "../../assets/images/dislike.png"
import axios from 'axios'

function DashBoardPage() {

  const [db, setDb] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [currentUserMatches, setCurrentUserMatches] = useState([]);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/${user._id}`);
      setCurrentUserMatches(res.data.matches)
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  
  const getUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/gender/${user.gender_interest}`);
      setDb(res.data.filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUsers();
  }, []);

  const [showAnimation, setShowAnimation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [animationType, setAnimationType] = useState(""); 
  const currentIndexRef = useRef(currentIndex);

  const likeHandler = () => {
    swipe('right');
    setShowAnimation(true);
    setAnimationType('heart');
  };
  
  const dislikeHandler = () => {
    swipe('left');
    setShowAnimation(true);
    setAnimationType('dislike');
  };

  const childRefs = useMemo(() => Array(db.length).fill(0).map(() => React.createRef()), [db.length]);

  useEffect(() => {
    if (showAnimation) {
      const timerId = setTimeout(() => {
        setShowAnimation(false);
      }, 1200);
      return () => clearTimeout(timerId);
    }
  }, [showAnimation]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const updateMatch = async (matchedId) => {
    axios
      .put(`http://localhost:8080/users/match/${user._id}`, {matchedId})
      .catch((err) => console.log(err))
  }

  const canSwipe = currentIndex >= 0

  const swiped = (direction, _id, index) => {
    setLastDirection(direction);
    if(direction === 'right') {
      updateMatch(_id);
    }
    updateCurrentIndex(index - 1);

    if (currentIndexRef.current === 0) {
      setShowButtons(false);
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  return (
    <div className='dashboard'>
      <div className='dashboard__card-container'>
      {
        db.filter(character => character._id !== user._id && !currentUserMatches.includes(character._id))
          .map((character, index) => (
            <TinderCard
              key={character._id}
              ref={childRefs[index]}
              className='dashboard__swipe'
              onSwipe={(dir) => swiped(dir, character._id, index)}
            >
              <div
                style={{ backgroundImage: 'url(' + character.img_url + ')' }}
                className='dashboard__card'
              >
                <div className='dashboard__name-container'>
                  <h3 className='dashboard__name'>{character.first_name}</h3>
                </div>
              </div>
            </TinderCard>
          ))
      }
        {showAnimation && (
          <img className={animationType} src={animationType === 'heart' ? heart : dislike} alt='like' />
        )}

      </div>

      <div className='dashboard__button-container'>
        <button className='dashboard__button' onClick={dislikeHandler}>NOPE</button>
        <button className='dashboard__button' onClick={likeHandler}>LIKE</button>
      </div>

    </div>
  )
}


export default DashBoardPage