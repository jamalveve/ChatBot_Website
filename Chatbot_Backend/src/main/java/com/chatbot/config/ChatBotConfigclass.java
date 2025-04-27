package com.chatbot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.chatbot.service.ChatBotService;

@Configuration
public class ChatBotConfigclass {
	
	@Bean
    public ChatBotService chatBotService() {
        return new ChatBotService("I'm a helpful assistant 🤖");
    }
	

}
