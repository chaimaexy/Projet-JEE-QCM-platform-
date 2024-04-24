package com.quiz.quiz_platform;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(ObjectId id) {
        return questionRepository.findById(id);
    }

   

    public List<Question> getQuestionsByExamId(String examId) {
        return questionRepository.findByExamId(examId);
    }
    public Question createQuestion(Question question) {
        // Perform any validation or additional processing here
        return questionRepository.save(question);
    }

}