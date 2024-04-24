import React from 'react';
import { Link } from 'react-router-dom';
import './Heroo.css';
import dark_arrow from '../../assets/dark-arrow.png';

const Hero = ({ userId }) => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
          <h1>Effortlessly create and share quizzes like never before!</h1>
          <p>This platform will help you create and pass quizzes with ease.</p>
          {userId ? (
            <>
              <Link to="/createQuiz" className='btnn'>Create a quiz <img src={dark_arrow}/></Link>
              <Link to="/enter-code" className='btnn'>Pass a quiz <img src={dark_arrow} alt="Arrow"/></Link>
            </>
          ) : (
            <>
              <Link to="/login" className='btnn'>Create a quiz <img src={dark_arrow}/></Link>
              <Link to="/login" className='btnn'>Pass a quiz <img src={dark_arrow} alt="Arrow"/></Link>
            </>
          )}
        </div>  
    </div>
  );
};

export default Hero;
