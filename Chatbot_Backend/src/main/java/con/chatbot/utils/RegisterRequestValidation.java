package con.chatbot.utils;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequestValidation {
	 @NotBlank(message = "Username is required")
	    public String username;

	    @NotBlank(message = "Password is required")
	    public String password;
}
