package com.quiz.quiz_platform;


import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<user, ObjectId >{
//talking to the database and getting the data back
	Optional<user> findUserByUsername(String username);
//	Optional<user> findUserById(ObjectId id);
	Optional<user> findUserByUsernameAndPassword(String username, String password);}
