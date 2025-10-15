package com.klef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeSpringBootApplication extends ServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(EmployeSpringBootApplication.class, args);
		System.out.println("Jenkins Full Stack..");
	}

}
