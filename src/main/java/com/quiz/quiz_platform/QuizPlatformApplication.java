package com.quiz.quiz_platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class QuizPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizPlatformApplication.class, args);
	}
	
	
}
