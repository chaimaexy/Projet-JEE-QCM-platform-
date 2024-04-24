package com.quiz.quiz_platform;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Document(collection = "questions")
@AllArgsConstructor
@NoArgsConstructor
public class Question {
	    @Id
	    private ObjectId _id;
	    
	    private String examId;
	    private String questionText;
	    private List<Option> options;
	    
		public String getExamId() {
			return examId;
		}
		public void setExamId(String examId) {
			this.examId = examId;
		}
		public String getQuestionText() {
			return questionText;
		}
		public void setQuestionText(String questionText) {
			this.questionText = questionText;
		}
		public List<Option> getOptions() {
			return options;
		}
		public void setOptions(List<Option> options) {
			this.options = options;
		}

	    // Constructors, getters, and setters
	    
	    
	}

	class Option {
	    private String optionText;
	    private boolean isCorrect;

	    public String getOptionText() {
			return optionText;
		}
		public void setOptionText(String optionText) {
			this.optionText = optionText;
		}
		
		public boolean getIsCorrect() {
			return isCorrect;
		}
		public void setIsCorrect(boolean isCorrect) {
			this.isCorrect = isCorrect;
		}
	    // Constructors, getters, and setters
	}