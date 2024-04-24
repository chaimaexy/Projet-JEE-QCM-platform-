import React from 'react'
import './Score.css';

const Score = ({ examId, studentId }) => {
    const currentDate = new Date().toLocaleString();
  
    return (
      <div className="score">
        <h1>Quiz Completed!</h1>
        <p>Your Score: {score} / {totalQuestions}</p>
        <p>Exam ID: {examId}</p>
        <p>Student ID: {studentId}</p>
        <p>finish Date: {currentDate}</p>
      </div>
    );
  };
  
  export default Score;
