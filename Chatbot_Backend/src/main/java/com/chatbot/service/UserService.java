package com.chatbot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatbot.model.UserDetails;
import com.chatbot.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            return false; // Username already exists
        }
        UserDetails user = new UserDetails();
        user.setUsername(username);
        user.setPassword(password); // For production, hash this!
        userRepository.save(user);
        return true;
    }

    public boolean validateUser(String username, String password) {
    	UserDetails user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
