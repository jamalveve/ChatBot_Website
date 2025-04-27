package con.chatbot.utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
@Component
public class BeanListener {
	
	
	

	    @Autowired
	    public ApplicationContext applicationContext;
	    
	    
	    //list of Beans to find

	    @PostConstruct
	    public void listBeansOnStartup() {
	        // List beans after the application starts
	        listBeans();
	    }

	    public void listBeans() {
	        // Get all the bean names
	        String[] beanNames = applicationContext.getBeanDefinitionNames();

	        // Iterate over the bean names and print them
	        System.out.println("List of Beans in the application:");
	        for (String beanName : beanNames) {
	            System.out.println(beanName);
	        }
	    }
	

}
