package com.capgemini.Movielist.Repository;


import com.capgemini.Movielist.model.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends CrudRepository <Movie, Long>{

    List<Movie> findByMovieID(long movieID);
}
