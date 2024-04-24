package com.quiz.quiz_platform;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResultRepository  extends MongoRepository<Result, ObjectId>{
	 List<Result> findByCreatorId(String userId);
}
