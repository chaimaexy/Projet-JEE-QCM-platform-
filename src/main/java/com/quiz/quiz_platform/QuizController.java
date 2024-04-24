package com.quiz.quiz_platform;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.ResultDTO;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="*")
public class QuizController {

    @Autowired
    private UserService userService;

    @Autowired
    private ExamService examService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ResultService resultService;

    // Endpoints for managing users
    @GetMapping("/users")
    public ResponseEntity<List<user>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<Optional<user>> getSingleUser(@PathVariable String username) {
		
		return new ResponseEntity<Optional<user>>(userService.singleUser(username) , HttpStatus.OK);
	}
    @PostMapping("/users")
    public ResponseEntity<user> addUser(@RequestBody user user) {
    	user savedUser = userService.addUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        // Check if the username is already taken
        Optional<user> existingUser = userService.singleUser(request.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        // Create a new user
        user newUser = new user();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword());
        newUser.setEmail(request.getEmail());

        // Save the new user
        user savedUser = userService.addUser(newUser);

        // Return the ID of the created user
        return ResponseEntity.ok(savedUser.get_id().toString());
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Optional<user> user = userService.findUserByUsernameAndPassword(request.getUsername(), request.getPassword());
        if (user.isPresent()) {
            String userId = user.get().get_id().toString();
            return ResponseEntity.ok(userId);
        } else {
        	 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");        }
    }
    
    // Endpoints for managing exams
    @GetMapping("/exams")
    public ResponseEntity<List<Exam>> getAllExams() {
        return new ResponseEntity<>(examService.getAllExams(), HttpStatus.OK);
    }
    
    @PostMapping("/validate_code")
    public ResponseEntity<String> validateCode(@RequestBody String code) {
        Optional<Exam> exam = examService.getExamByUniqueCode(code);
        if (exam.isPresent()) {
            String examId = exam.get().getId().toString();
            return new ResponseEntity<>(examId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Code is invalid", HttpStatus.BAD_REQUEST);
        }
    }
    
//    @GetMapping("/exams/{id}")
//    public ResponseEntity<Optional<Exam>> getExamById(@PathVariable ObjectId id) {
//        return new ResponseEntity<>(examService.findExamById(id), HttpStatus.OK);
//    }

    @PostMapping("/exams")
    public ResponseEntity<Map<String, String>> createExam(@RequestBody Exam exam) {
        Map<String, String> response = new HashMap<>();
        String uniqueCode = UUID.randomUUID().toString().substring(0, 8); // Generate an 8-character unique code
        exam.setUniqueCode(uniqueCode);
        Exam savedExam = examService.createExam(exam);
            response.put("examId", savedExam.getId().toString());
            response.put("uniqueCode", uniqueCode);
            return ResponseEntity.ok(response); // Return the exam ID and unique code
       
    }

    
    @GetMapping("/exams/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable String id) {
        ObjectId examId = new ObjectId(id);
        Optional<Exam> exam = examService.findExamById(examId);
        if (exam.isPresent()) {
            Exam examDetails = exam.get();
            // Convert ObjectId to String
            String examIdString = examDetails.getId().toString();
            examDetails.setId(examIdString);
            return ResponseEntity.ok(examDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Endpoints for managing questions
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
    }
    @PostMapping("/questionCreate")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.createQuestion(question);
        if (savedQuestion != null) {
            return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<Optional<Question>> getQuestionById(@PathVariable ObjectId id) {
        return new ResponseEntity<>(questionService.getQuestionById(id), HttpStatus.OK);
    }

    

    @GetMapping("/questions/exam/{examId}")
    public ResponseEntity<List<Question>> getQuestionsByExamId(@PathVariable String examId) {
        List<Question> questions = questionService.getQuestionsByExamId(examId);
        return ResponseEntity.ok(questions);
    }
    
    // Endpoints for managing results
    @GetMapping(" ")
    public ResponseEntity<List<Result>> getAllResults() {
        return new ResponseEntity<>(resultService.getAllResults(), HttpStatus.OK);
    }

    @GetMapping("/results/creator/{creatorId}")
    public ResponseEntity<List<ResultDTO>> getResultsByCreatorId(@PathVariable String creatorId) {
        List<ResultDTO> results = resultService.getResultsByCreatorId(creatorId);
        return ResponseEntity.ok(results);
    }
    
    @PostMapping("/save")
    public ResponseEntity<Result> saveResult(@RequestBody Result result) {
        Result savedResult = resultService.saveResult(result);
        return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
    }
    
   
}
