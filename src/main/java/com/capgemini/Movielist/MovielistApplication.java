package com.capgemini.Movielist;

import com.capgemini.Movielist.model.Movie;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.CrudRepository;

@SpringBootApplication
public class MovielistApplication
{
	public static void main(String[] args) {
		SpringApplication.run(MovielistApplication.class, args);
	}
}
