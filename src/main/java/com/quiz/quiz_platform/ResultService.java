package com.quiz.quiz_platform;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.ResultDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ResultService {
    
    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private ExamService examService;

    @Autowired
    private UserService userService;

    public List<Result> getAllResults() {
        List<Result> results = resultRepository.findAll();
        return results;
    }

    public Optional<Result> getResultById(ObjectId userId) {
        Optional<Result> result = resultRepository.findById(userId);
        return result;
    }

//    public List<Result> getResultsByUserId(String userId) {
//        // Implement the logic to fetch results by user ID from the repository
//        return resultRepository.findByUserId(userId);
//    }
    public Result addResult(Result result) {
        // You may add additional logic here, such as setting default values or validating the result
        return resultRepository.save(result);
    }

    public List<ResultDTO> getResultsByCreatorId(String creatorId) {
        // Retrieve results by creator ID
        List<Result> results = resultRepository.findByCreatorId(creatorId);
        List<ResultDTO> resultDTOs = new ArrayList<>();

        // Iterate through results and create ResultDTO objects
        for (Result result : results) {
        	
        	ObjectId examId = new ObjectId(result.getExamId());
        	Optional<Exam> examOptional = examService.findExamById(examId);
        	
        	ObjectId userId = new ObjectId(result.getUserId());
        	Optional<user> userOptional = userService.findUserById(userId);
        	
            if (examOptional.isPresent() && userOptional.isPresent()) {
                Exam exam = examOptional.get();
                user user = userOptional.get();
                ResultDTO resultDTO = new ResultDTO(exam.getTitle(), user.getUsername(), result.getScore(), result.getCreatedAt());
                resultDTOs.add(resultDTO);
            }
        }

        return resultDTOs;
    }
    
    public Result saveResult(Result result) {
    	
        return resultRepository.save(result);
    }
}
