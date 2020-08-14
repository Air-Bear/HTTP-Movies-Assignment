import React from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const params= useParams();

  const deleteMovie = event => {
    event.preventDefault();
    axios.delete("http://localhost:5000/api/movies/" + params.id)
    .then(res => {
      console.log(res);
      props.getMovieList();
      //props.history.push("/");
      console.log(props);
    });
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Link to={`/update-movie/${props.movie.id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
};

export default MovieCard;
