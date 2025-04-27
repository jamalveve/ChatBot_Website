package com.chatbot.model;

public class QADatas {

	public String question;
	public String answer;

	public QADatas(String question, String answer) {
		this.question = question;
		this.answer = answer;
	}

	public String getQuestion() {
		return question;
	}

	public String getAnswer() {
		return answer;
	}
	// Getters and setters
   

    public void setQuestion(String question) {
        this.question = question;
    }

    

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}