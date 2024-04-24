package com.quiz.quiz_platform;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository userrepo;
	public List<user> getAllUsers(){
		return userrepo.findAll();
		
	}
	public Optional<user> singleUser(String username) {
		return userrepo.findUserByUsername(username);
		
	}
	public user addUser(user u) {
		return userrepo.save(u);
		
	}
	 public Optional<user> findUserByUsernameAndPassword(String username, String password) {
	        return userrepo.findUserByUsernameAndPassword(username, password);
	    }
	 
	 public Optional<user> findUserById(ObjectId id) {
	        return userrepo.findById(id);
	    }
//
//	    public Optional<user> findUserById(String id) {
//	        ObjectId objectId;
//	        try {
//	            objectId = new ObjectId(id);
//	        } catch (IllegalArgumentException e) {
//	            // Handle invalid ObjectId string
//	            return Optional.empty();
//	        }
//	        return findUserById(objectId);
//	    }
}
