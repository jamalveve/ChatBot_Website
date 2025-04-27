package com.chatbot.service;

public class DefaultAnswerService {
	public final String defaultMessage;

	public DefaultAnswerService(String defaultMessage) {
		this.defaultMessage = defaultMessage;
	}

	public String getDefaultAnswer() {
		return defaultMessage;
	}

}
