import React from 'react';
import './QuizInstructions.css';
import { Link } from 'react-router-dom';

const QuizInstructions = () => {
    const examId = localStorage.getItem('examId');
    const handleNoClick = () => {
        localStorage.removeItem('examId');
    };

    return (
      
         <div className='instructions container'>
         <form>
             <h1>Instructions</h1>
             <p>Ensure you read this guide from start to finish.</p>
             <ul className='browser-default' id='main-list'>
                 <li>Eahc question of the test has a duration of 30 secondes.</li>
                 <li>Every question contains a different number of options.</li>
                 <li>Select the option which best answers the question by clicking (or selecting) it.</li>
                 <li>The timer starts as soon as the quiz loads.</li>
             </ul>
             <div className='button-group'>
                  <Link to='/' onClick={handleNoClick} className='btn btn-secondary'>
                    No, take me back
                </Link>
                {examId && (
                    <Link to='/play' className='btn btn-primary'>
                        Okay, Let's Start!
                    </Link>
                 )}
             </div>
         </form>
     </div>
    );
};

export default QuizInstructions;
