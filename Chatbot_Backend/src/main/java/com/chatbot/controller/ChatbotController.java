package com.chatbot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatbot.model.QADatas;
import com.chatbot.model.UserDetails;
import com.chatbot.repository.UserRepository;
import com.chatbot.service.ChatBotService;
import com.chatbot.service.DefaultAnswerService;
import com.chatbot.service.UserService;

@RestController
@Validated

@CrossOrigin(origins = "http://localhost:5174") // Allow requests from your React app
@RequestMapping("/api")
public class ChatbotController {

	@Autowired
	private final ChatBotService qaService;
	
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private Environment environment;
    
    @Autowired
//    private DefaultAnswerService defaultAnswerService; // ✅ correct type


	
    @Value("${server.port}")
    private String customProperty;


    @Autowired
    public ChatbotController(ChatBotService qaService, UserRepository userRepository) {
        this.qaService = qaService;
        this.userRepository = userRepository;
    }


	@Autowired
    private UserService userService;

	// @Autowired
    // @Qualifier("enableLearningMode")
    // private Boolean enableLearningMode; 

	 @PostMapping("/register")
	    public ResponseEntity<Map<String, String>> registerUser( @RequestBody Map<String, String> requestBody) {
	        String username = requestBody.get("username"); //Extracts the value of the "username" field from the request body.
            String password = requestBody.get("password");

	        if (userRepository.findByUsername(username) != null) {//Checks if a user with the given username already exists in the database by querying the userRepository.
	            Map<String, String> response = new HashMap<>();
	            response.put("message", "Username already exists");
	            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);//Returns an HTTP 400 (Bad Request) response with the message if the username is already in use.


	        }

	        UserDetails user = new UserDetails();//Creates a new instance of your UserDetails entity to represent the new user.
            user.setUsername(username);
	        user.setPassword(password); // In a real application, hash the password
	        userRepository.save(user);//Saves the new user to the database using the repository.

			Map<String, String> response = new HashMap<>();
	        response.put("message", "User registered successfully");
	        return new ResponseEntity<>(response, HttpStatus.OK);
	 }
	 @PostMapping("/login")
	 public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
	     String username = user.get("username");
	     String password = user.get("password");
	     //added
	        Map<String, String> response = new HashMap<>();

	     UserDetails found = userRepository.findByUsername(username);
	     if (found != null && found.getPassword().equals(password)) {
//	         return ResponseEntity.ok(Map.of("message", "Login successful"));
      //added
	    	 response.put("message", "Login successful");
	            return ResponseEntity.ok(response);
	     }
//	     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Username or password entered wrong"));
	     //added
	     response.put("message", "Username or password entered wrong");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	 }

	 @PostMapping("/chatbot/qna")
	 public ResponseEntity<Map<String, String>> getChatbotResponse(@RequestBody Map<String, String> request) {
	     try {
	         String userMessage = request.get("message");
	         System.out.println("Received message: " + userMessage);

	         List<QADatas> qnaList = qaService.getQnAList();
	         System.out.println("QnA List size: " + (qnaList != null ? qnaList.size() : "null"));

	         for (QADatas qna : qnaList) {
	             System.out.println("Checking question: " + qna.getQuestion());
	             if (qna.getQuestion().equalsIgnoreCase(userMessage)) {
	                 Map<String, String> response = new HashMap<>();
	                 response.put("answer", qna.getAnswer());
	                 return ResponseEntity.ok(response);
	             }
	         }

	         Map<String, String> response = new HashMap<>();
	         response.put("answer", "Sorry, I don't know the answer to that yet!");
//	         response.put("answer", defaultAnswerService.getDefaultAnswer());

	         return ResponseEntity.ok(response);

	     } catch (Exception e) {
	         e.printStackTrace(); // <- This will give the full stack trace
	         Map<String, String> error = new HashMap<>();
	         error	.put("error", "Internal server error: " + e.getMessage());
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	     }
	 }


    @GetMapping("/chatbot/faqs")
    public ResponseEntity<List<QADatas>> getFaqs() {
    List<QADatas> qnaList = qaService.getQnAList();
    return ResponseEntity.ok(qnaList);
    }
	 
	@GetMapping("/feature-flags")
	public Map<String, Boolean> getFeatureFlags() {
		Map<String, Boolean> flags = new HashMap<>();
		flags.put("learningMode", qaService.isLearningModeEnabled());
		return flags;
	}
	@PostMapping("/chatbot/teach")
public ResponseEntity<?> teachBot(@RequestBody Map<String, String> request) {
    String question = request.get("question");
    String answer = request.get("answer");
    if (question != null && answer != null) {
        qaService.getQnAList().add(new QADatas(question, answer));
        return ResponseEntity.ok(Map.of("message", "Learned successfully"));
    } else {
        return ResponseEntity.badRequest().body(Map.of("error", "Missing question or answer"));
    }
}

}
