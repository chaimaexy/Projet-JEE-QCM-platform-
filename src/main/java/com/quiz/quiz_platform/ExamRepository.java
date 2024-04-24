package com.quiz.quiz_platform;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExamRepository extends MongoRepository<Exam, ObjectId> {

	Optional<Exam> findByUniqueCode(String uniqueCode);
    
}