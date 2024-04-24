package com.quiz.quiz_platform;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {
    @Autowired
    private ExamRepository examRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }


    public Exam createExam(Exam exam) {
        // You may add additional logic here, such as setting default values or validating the exam
        return examRepository.save(exam);
    }

    public Optional<Exam> getExamByUniqueCode(String code) {
        return examRepository.findByUniqueCode(code);
    }
    
    public Optional<Exam> findExamById(ObjectId id) {
        return examRepository.findById(id);
    }

    public Optional<Exam> getExamById(String id) {
        ObjectId objectId;
        try {
            objectId = new ObjectId(id);
        } catch (IllegalArgumentException e) {
            // Handle invalid ObjectId string
            return Optional.empty();
        }
        return examRepository.findById(objectId);
    }

   




    // Add other methods as needed
}