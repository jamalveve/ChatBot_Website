package com.chatbot.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.net.URL;

//@SpringBootApplication(scanBasePackages = { "com.chatbot.repository","com.chatbot.model","com.chatbot.utils", "com.chatbot.main","com.chatbot.controller", "com.chatbot.service", "com.chatbot.config"})
@EntityScan(basePackages = { "com.chatbot.model" })
@EnableJpaRepositories(basePackages = "com.chatbot.repository")

@SpringBootApplication(scanBasePackages = { "com.chatbot"})
public class ChatBotApplication {

	
	    public static void main(String[] args) throws StreamReadException, DatabindException, IOException {
	        SpringApplication.run(ChatBotApplication.class, args);
	        
//	        ObjectMapper mapper = new ObjectMapper();
//	        Test test = mapper.readValue(new File("src/main/resources/Json_files/test.json"), Test.class);
//
//	        System.out.println(test.userid); // Example usage
//	        
//	        URL resourceUrl = getClass().getClassLoader().getResource("test.json");
//	        File file = new File(resourceUrl.getPath());
//	        System.out.println(file.getAbsolutePath());
	    }

}
