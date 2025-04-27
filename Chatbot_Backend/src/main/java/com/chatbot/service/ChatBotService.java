package com.chatbot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.chatbot.model.QADatas;


@Service
public class ChatBotService {

	public List<QADatas> qnaList;
    public final String defaultMessage;

	private final Boolean enableLearningMode; // <-- Add this field
 @Autowired
    public ChatBotService(
        @Qualifier("enableLearningMode") Boolean enableLearningMode
    ) {
        this.defaultMessage = "I'm a helpful assistant 🤖";
        this.enableLearningMode = enableLearningMode;
        initializeQnA();
    }

	public ChatBotService(String defaultMessage) {
        this.defaultMessage = defaultMessage;
		//have to intialise must or compiler error
		this.enableLearningMode = true; // <-- initialize here

        initializeQnA(); // ✅ Fix: call this to populate the list

	}
	public ChatBotService() {
		 this.defaultMessage = "";
		 this.enableLearningMode = false; // <-- initialize here

	        initializeQnA(); // Also works for no-arg constructor
	        
	}
    private void initializeQnA() {
    	
    	// Initialize with some sample data
		qnaList = new ArrayList<>();
		qnaList.add(new QADatas("Hello", "Hi! How can I help you today?"));
		qnaList.add(new QADatas("guide on docker", "yet not uploaded in backend"));
		qnaList.add(new QADatas("random", "I'm your friendly chatbot assistant."));

		qnaList.add(new QADatas("what is your name", "I'm your friendly chatbot assistant."));
		qnaList.add(new QADatas("how are you", "I'm just code, but I'm running great!"));
		qnaList.add(new QADatas("which river is the longest", "The Amazon River spans around 4,345 miles!"));
		qnaList.add(new QADatas("who is your creator", "Jamal Veve M"));
		qnaList.add(new QADatas("guide on sql connection", "  \n"
				+ "*   **MAke sure MySQL Server Installed:**\n"
				+ "*\n"
				+ "\n"
				+ "### **Step-by-Step Guide (Using MySQL Command-Line Client)**\n"
				+ "\n"
				+ "1.  **Open MySQL Command-Line Client:**\n"
				+ "    *   On Windows: Search for \"MySQL Command Line Client\" in the Start Menu.\n"
				+ "    *   On macOS/Linux: Open a terminal.\n"
				+ "\n"
				+ "2.  **Connect to the MySQL Server:**\n"
				+ "    *   The command to connect is:\n"
				+ "      \n"
				+ "        mysql -u root -p\n"
				+ "        ```\n"
				+ "        *   `-u root`:  Specifies the username as \"root.\"  You might need to use a different username if you've configured one.\n"
				+ "        *   `-p`:  Prompts you for the root user's password.  Enter the password when prompted.\n"
				+ "\n"
				+ "3.  **Create the Database:**\n"
				+ "    *   Once you're connected, execute the following SQL command to create the database:\n"
				+ "        ``\n"
				+ "        CREATE DATABASE chatbotdb;\n"
				+ "        ```\n"
				+ "    *   This creates a database named \"chatbotdb\".  If you want to use a different name, change \"chatbotdb\" accordingly.\n"
				+ "\n"
				+ "4.  **Select the Database:**\n"
				+ "    *   To work with the newly created database, you need to select it:\n"
				+ "        ``\n"
				+ "        USE chatbotdb;\n"
				+ "        ```\n"
				+ "\n"
				+ "5.  **Create the `users`Table:\n"
				+ "        CREATE TABLE users (\n"
				+ "          id INT AUTO_INCREMENT PRIMARY KEY,\n"
				+ "          username VARCHAR(50) UNIQUE NOT NULL,\n"
				+ "          password VARCHAR(255) NOT NULL\n"
				+ "        );\n"
				+ "     \n"
				+ "6.  **(Optional) Verify Table Creation:**\n"
				+ "  \n"
				+ "        \n"
				+ "        SHOW TABLES;\n"
				+ "      \n"
				+ "        This should display \"users\" in the output.\n"
				+ "\n"
				+ "7.  **(Optional) Describe the Table:**\n"
				+ "   \n"
				+ "        DESCRIBE users;\n"
				+ "     \n"
				+ "        This will show the columns, data types, keys, and other details of the `users` table.\n"
				+ ""));

		
	}
    
    public List<QADatas> getQnAList() {
		return qnaList;
	}
	// public String getAnswer(String question) {
	//     for (QADatas qa : qnaList) {
	//         if (qa.getQuestion().equalsIgnoreCase(question.trim())) {
	//             return qa.getAnswer();
	//         }
	//     }
	//     return "❌ Sorry, I couldn't find an answer to that question.";
	// }
//updated after config


private String normalize(String s) {
    return s == null ? "" : s.trim().replaceAll("\\p{Punct}", "").toLowerCase();
}
	// Main answer logic with normalization
    public String getAnswer(String question) {
        String normQuestion = normalize(question);
        for (QADatas qa : qnaList) {
            if (normalize(qa.getQuestion()).equals(normQuestion)) {
                return qa.getAnswer();
            }
        }
        // Learning mode logic
        if (Boolean.TRUE.equals(enableLearningMode)) {
            return "Learning mode is ON. I don't know the answer yet, but you can teach me!";
        }
        return "❌ Sorry, I couldn't find an answer to that question.";
    }

    // public boolean isLearningModeEnabled() {
    //     return Boolean.TRUE.equals(enableLearningMode);
    // }

    // For teach mode: add new Q&A
    public void addQnA(String question, String answer) {
        qnaList.add(new QADatas(question, answer));
    }

    // Example method to check if learning mode is enabled (optional)
    public boolean isLearningModeEnabled() {
        return enableLearningMode != null && enableLearningMode;
    }

}
