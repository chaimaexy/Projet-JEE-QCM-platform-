import React, { useState } from 'react';
import './CreateQuiz.css';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const CreateQuiz = ({ userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]
  });

  const [uniqueCodee, setUniqueCode] = useState(null); // State to store the generated unique code
  
  const handleInputChangee = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e, index, subIndex) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedQuestions = [...formData.questions];
      updatedQuestions[index].options[subIndex][name] = checked;
      setFormData({ ...formData, questions: updatedQuestions });
    } else {
      const updatedQuestions = [...formData.questions];
      if (subIndex !== undefined) {
        updatedQuestions[index].options[subIndex][name] = value;
      } else {
        updatedQuestions[index][name] = value;
      }
      setFormData({ ...formData, questions: updatedQuestions });
    }
    console.log('handleInputChange called');

  };

  const handleAddQuestion = () => {
    setFormData(prevState => ({
      ...formData,
      questions: [
        ...prevState.questions,
        { questionText: '', options: [{ optionText: '', isCorrect: false }] }
      ]
    }));
    console.log('handleAddQuestion called');
  };

  const handleAddAnswer = index => {
    console.log('handleAddAnswer called');
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].options.push({ optionText: '', isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('handleSubmit called');
      const examResponse = await api.post('/api/v1/exams', {
        ...formData,
        uniqueCode: 'X', 
        creatorId: userId,
        createdAt: new Date().toISOString() // Set current date and time
      });
      setUniqueCode(examResponse.data.uniqueCode); 

      await Promise.all(formData.questions.map(async (question) => {
        const response = await api.post('/api/v1/questionCreate', {
          ...question,
          examId: examResponse.data.examId // Use the generated exam ID
        });
        console.log('Question saved:', response.data);
        console.log('examResponse.data:', examResponse.data);
      }));
      setFormData({
        title: '',
        description: '',
        questions: [{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]
      });
      
      window.location.href = `/share?uniqueCode=${examResponse.data.uniqueCode}`;
    } catch (error) {
      console.error('Error saving exam or questions:', error);
    }
    console.log('thecode is ',examResponse.data.uniqueCode);
  };

  return (
    <div className='createQuiz container'>
      <h1>Create a Quiz!</h1>
      <div className='form' >
        <div className='dsc-area'>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChangee}
          />
        </div>
        <div className='dsc-area'>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChangee}
          ></textarea>
        </div>
        
        {formData.questions.map((question, index) => (
          <div key={index} className='question-area'>
            <label>Question {index + 1}:</label>
            <input
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={e => handleInputChange(e, index)}
            />
            {question.options.map((answer, subIndex) => (
              <div key={subIndex}>
                <label>Answer {subIndex + 1}:</label>
                <input
                  type="text"
                  name="optionText"
                  value={answer.optionText}
                  onChange={e => handleInputChange(e, index, subIndex)}
                />
                <label>
                  Correct Answer:</label>
                  <input
                    className='checkbox custom-checkbox'  // Added 'custom-checkbox' class
                    type="checkbox"
                    name="isCorrect"
                    checked={answer.isCorrect}
                    onChange={e => handleInputChange(e, index, subIndex)}
                  />
              </div>
            ))}
            <button className='add-buttons' onClick={() => handleAddAnswer(index)}>Add Answer</button>
          </div>
        ))}
        
        <button className='end-buttons' onClick={handleAddQuestion}>Add Question</button>
        <button
          onClick={handleSubmit}
          className='end-buttons'
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
