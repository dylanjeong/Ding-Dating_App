import './App.scss'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage"
import StartPage from "./pages/StartPage/StartPage"
import DashBoardPage from "./pages/DashBoardPage/DashBoardPage"
import ChatPage from './pages/ChatPage/ChatPage'
import Header from './components/Header/Header'
import { useState } from 'react'

function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={
          <HomePage 
            isLoggedIn={isLoggedIn} 
            setShowSignUpModal={setShowSignUpModal} 
            showSignUpModal={showSignUpModal} 
            showSignInModal={showSignInModal} 
            setShowSignInModal={setShowSignInModal} 
            setLoggedIn={setLoggedIn}
            setUser={setUser}
          />
        }/>
        <Route path="/dashboard" element={<DashBoardPage/>} />
        <Route path="/start" element={<StartPage
          user={user}
         />
         }/>
        <Route path="/chat" element={<ChatPage 
          userId = {user._id}
        />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App