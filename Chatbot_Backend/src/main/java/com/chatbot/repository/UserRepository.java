package com.chatbot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.UserDetails;

public interface UserRepository extends JpaRepository<UserDetails, Long> {
	UserDetails findByUsername(String username);
}
