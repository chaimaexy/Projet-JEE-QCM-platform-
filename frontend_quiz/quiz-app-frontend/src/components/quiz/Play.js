import React , {Component} from 'react';
import './Play.css';
import './Score.js';
import M from 'materialize-css';
import api from '../../api/axiosConfig';
import isEmpty from '../../utils/is-empty';
import { Link } from 'react-router-dom';

class Play extends Component {
  constructor (props){
    
    super(props);
    sessionStorage.setItem('examCompleted', 'false');
    this.state = {
      startDate : new Date().toLocaleString(),
      questions :[],
      currentQuestion:{},
      nextQuestion:{},
      numberOfQuestions:0,
      numberOfAnswerdQuestions:0,
      currentQuestionIndex:0,
      score:0,
      correctAnswers:0,
      wrongAnswers:0,
      time: 30
    };
  }

  componentDidMount() {
    sessionStorage.setItem('examCompleted', 'false');
      const { examId, userId } = this.props;
  
      // Fetch complete exam details and questions from the API
      Promise.all([
        api.get(`/api/v1/exams/${examId}`),
        api.get(`/api/v1/questions/exam/${examId}`)
      ])
        .then(([examResponse, questionsResponse]) => {
          const examDetails = examResponse.data;
          const questionsFetch = questionsResponse.data;
  
          const { title, description } = examDetails; // Extract examId and creatorId from the exam details
          this.setState({
            examTitle: title,
            description: description,
            questions: questionsFetch
          }, () => {
            // Log the state variable after it's updated
            this.resetTimer();
            this.displayQuestions(); // Call displayQuestions after updating the state
          });
        })
        .catch(error => {
          console.error('Error fetching exam details/questions:', error);
        });
    
  }
  

  componentWillUnmount() {
    
    clearInterval(this.timerInterval);
    
  }
  
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }), () => {
        if (this.state.timer === 0) {
          this.handleTimeout();
        }
      });
    }, 1000);
  }
  resetTimer() {
    clearInterval(this.timerInterval);
    this.setState({ timer: 30 });
    this.startTimer();
  }

  handleTimeout() {
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnswerdQuestion: prevState.numberOfAnswerdQuestion + 1,
    }), () => {
      // Reset timer for the next question
      this.resetTimer();
     // this.displayQuestions();
    });
  }

  displayQuestions = () => {
    let { currentQuestionIndex, questions } = this.state;
    if (!isEmpty(questions)) {
      const currentQuestion = questions[currentQuestionIndex];
      const nextQuestion = questions[currentQuestionIndex + 1];
      
  
      this.setState({
        currentQuestion,
        nextQuestion
        
      });
    }
  };
 
  
  handleOptionClick = (selectedOption) => {
    this.resetTimer();
    const { currentQuestion } = this.state;
    const isCorrect = currentQuestion.options[selectedOption].isCorrect;
  
    const updatedOptions = currentQuestion.options.map((option, index) => {
      if (index === selectedOption) {
        return { ...option, selected: true, isCorrect };
      } else {
        return { ...option, selected: false };
      }
    });
  
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        options: updatedOptions
      }
    }));
  
    if (isCorrect) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  // handleQuitButtonClick = () => {
   
  //   if (window.confirm('Are you sure you want to quit ?')){
        
  //   }
  //};
     
  correctAnswer = () => {
        M.toast({
          html: 'Option correct',
          classes: 'toast-valid container ',
          displayLength:1500
        });
          this.setState(prevState => ({
              score : prevState.score +1,
              correctAnswers : prevState.correctAnswers +1,
              currentQuestionIndex: prevState.currentQuestionIndex + 1 ,
              numberOfAnswerdQuestions : prevState.numberOfAnswerdQuestions +1
            
          }), () => {

            if (this.state.nextQuestion === undefined){
              this.endGame();
          }else{
            this.displayQuestions();
          }
          });
      }

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: 'Option incorrect',
      classes: 'toast-invalid container ',
      displayLength:1500
    });
      this.setState(prevState => ({
          wrongAnswers : prevState.wrongAnswers + 1,
          currentQuestionIndex: prevState.currentQuestionIndex + 1 ,
          numberOfAnswerdQuestions : prevState.numberOfAnswerdQuestions+1 
        
      }), () => {
        if (this.state.nextQuestion === undefined){
            this.endGame();
        }else{
          this.displayQuestions();
        }
        
      });
  }

      endGame = () => {
        const { examId, userId } = this.props;
    
        // Fetch complete exam details from the API
        api.get(`/api/v1/exams/${examId}`)
          .then(response => {
            const examDetails = response.data;
            const {title, creatorId } = examDetails; // Extract examId and creatorId from the exam details
            this.setState({ examDetails }, () => {
              const { state } = this;
              const { score, numberOfQuestions, questions, correctAnswers, wrongAnswers } = state;
             
              // Create the result object to store
              const resultData = {
                examId: examId,
                userId: userId, 
                creatorId,
                score: `${correctAnswers} / ${questions.length}`,
                createdAt: new Date().toISOString() // Use ISO string format for date
              };
    
              // Now you can send the resultData object to the backend to store the exam result
              this.saveExamResult(resultData);
            });
            this.setState({ examTitle: title });

            sessionStorage.setItem('examCompleted', 'true');
          })
          .catch(error => {
            console.error('Error fetching exam details:', error);
          });
    };
    
    saveExamResult = (resultData) => {
      // Send the resultData object to the backend to store the exam result
      api.post('/api/v1/save', resultData)
        .then(response => {
          console.log('Exam result saved successfully:', response.data);
         
        })
        .catch(error => {
          console.error('Error saving exam result:', error);
        });
    };
    
    
      


      
  render() {
    const { currentQuestion, questions, timer , correctAnswers, startDate, examTitle,description } = this.state;
    const totalQuestions = questions.length;
    const finishDate = new Date().toLocaleString();
    return (
      <div className='play container'>
      {/* Render Score component if there are no more questions */}
      { 
      ( this.state.currentQuestionIndex +1) > totalQuestions ? (
        <>
         
        {clearInterval(this.timerInterval)}
        <div className='result-container'>
        <h1>Quiz Completed!</h1>
        <div className='result-p'>
        <p>Exam Title: {examTitle}</p>
        <p>Your Score: {correctAnswers} / {totalQuestions}</p>
        <p>start Date: {startDate}</p>
        <p>finish Date: {finishDate}</p>
        </div>
       
        </div>
        
      </>
       
      ) : (
        <div className='questions'>
        <h1>Quiz:{this.state.examTitle}</h1>
        <h3>{this.state.description}</h3>
        <p className='lifeline-container'>
          <span> Question : {this.state.currentQuestionIndex +1} / {totalQuestions}</span>
          <span className='lifeline'>Time left: 00:{timer}</span>
        </p>

        {currentQuestion && currentQuestion.options && currentQuestion.options.length > 0 && (
          <>
            <h5>{currentQuestion.questionText}</h5>
            <div className='options-container'>
            {currentQuestion.options.map((option, index) => (
              <p
                onClick={() => this.handleOptionClick(index)}
                key={index}
                className={`option ${option.selected ? (option.isCorrect ? 'correct-option' : 'incorrect-option') : ''}`}
              >
                {option.optionText}
              </p>
            ))}
          </div>
          </>
        )}

        
      </div>
      )}
    </div>
    );
  }
  
}

export default Play;
