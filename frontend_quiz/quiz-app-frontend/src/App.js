import React, { useState } from 'react';
import './App.css';
import api from './api/axiosConfig';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/Login/Login';
import Heroo from './components/Heroo/Heroo';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import CreateAccount from './components/CreateAccount/CreateAccount';
import EnterCode from './components/EnterCode/EnterCode';
import QuizInstructions from './components/quiz/QuizInstructions';
import Results from './components/Results/Results';
import Share from './components/share/Share';
import Play from './components/quiz/Play';
import Score from './components/quiz/Score';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Initialize userId from local storage
  const [examId, setexamId] = useState(localStorage.getItem('examId')); // Initialize userId from local storage

  const handleLogin = (id) => {
    setUserId(id); // Update userId when logged in
  };

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove userId from local storage
    localStorage.removeItem('examId'); // Remove examId from local storage
    setUserId(null); // Clear userId when logged out
  };

  return (
    <div className="App">
       <Navbar userId={userId} onLogout={handleLogout} />
      
       <Routes>
         <Route path="/" element={<Heroo userId={userId} />} />
         <Route path="enter-code" element={<EnterCode />} />
         <Route path="createQuiz" element={<CreateQuiz userId={userId} />} />
         <Route path="results" element={<Results userId={userId} />} />
         <Route path="/createAccount" element={<CreateAccount />} />
         <Route path="/instructions" element={<QuizInstructions />} />
         <Route path="/share" element={<Share />} />
        
         <Route path="/play" element={<Play examId={examId} userId={userId} />} />

         <Route path="*" element={<Navigate to="/" />} />
         
         {/* Only render login route if user is not logged in */}
         {!userId && <Route path="login" element={<Login onLogin={handleLogin} />} />}
       </Routes>
    </div>
  );
}

export default App;
