package com.chatbot.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeatureConfig {
    @Value("${chatbot.learning-mode.enabled:true}") // default true
    private boolean learningModeEnabled;
    

    @Bean
    public Boolean enableLearningMode() {
        return learningModeEnabled;
    }
}
