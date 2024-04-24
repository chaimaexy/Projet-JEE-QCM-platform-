package com.quiz.quiz_platform;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;



@Document(collection = "exams")
@AllArgsConstructor
@NoArgsConstructor
public class Exam {
	  @Id
	    private ObjectId _id;
	    private String title;
	    private String description;
	    private String uniqueCode;
	    private String creatorId; // Assuming creatorId is a String for simplicity
	    private String createdAt;
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getUniqueCode() {
			return uniqueCode;
		}
		public void setUniqueCode(String uniqueCode) {
			this.uniqueCode = uniqueCode;
		}
		public String getCreatorId() {
			return creatorId;
		}
		public void setCreatorId(String creatorId) {
			this.creatorId = creatorId;
		}
		public String getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(String createdAt) {
			this.createdAt = createdAt;
		}
		public ObjectId getId() {
			
			return _id;
		}
		public void setId(String examIdString) {
		
			ObjectId id = new ObjectId(examIdString);
			this._id=id;
		}

   
}
