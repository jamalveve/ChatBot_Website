package com.chatbot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.chatbot.service.DefaultAnswerService;

@Configuration

public class DefaultAnswerConfig {
	
	 @Bean
	    public DefaultAnswerService defaultAnswerService() {
	        return new DefaultAnswerService("I'm still learning. I'll answer better next time!");
	    }

}
