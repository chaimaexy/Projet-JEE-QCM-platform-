package com.quiz.quiz_platform;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Document(collection = "users")

@AllArgsConstructor
@NoArgsConstructor
public class user {
	
	@Id
    private ObjectId _id;
    private String username;
    private String password;
    private String email;
    
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public ObjectId get_id() {
		// TODO Auto-generated method stub
		return _id;
	}

  
}