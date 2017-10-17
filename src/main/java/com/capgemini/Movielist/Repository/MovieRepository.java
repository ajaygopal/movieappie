package com.capgemini.Movielist.Repository;


import com.capgemini.Movielist.model.Movie;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MovieRepository extends CrudRepository <Movie, Long>{

    List<Movie> findByMovieID(long movieID);
}
