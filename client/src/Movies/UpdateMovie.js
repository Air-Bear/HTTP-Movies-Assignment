import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateMovie(props){
    const [movie, setMovie] = useState(null);
    const params = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/api/movies/" + params.id)
        .then(res => {
            setMovie(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [params.id]);

    const submitHandler = event => {
        event.preventDefault();

        axios.put("http://localhost:5000/api/movies/" + params.id, movie)
        .then(res => {
            console.log(res);
            props.getMovieList();
            props.history.back();
        })
        .catch(err => {
            console.log(err);
        });
    };

    const changeHandler = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.name === "stars" ?  event.target.value.split(", ") : event.target.value
        });
    };

    if(!movie){
        return <h1>loading...</h1>
    }

    return (
        <form onSubmit={submitHandler}>
            {/* title, director, score, cast */}
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={movie.title} onChange={changeHandler} />
            <label htmlFor="director">Director</label>
            <input type="text" name="director" id="director" value={movie.director} onChange={changeHandler} />
            <label htmlFor="score">Score</label>
            <input type="text" name="metascore" id="score" value={movie.metascore} onChange={changeHandler} />
            <label htmlFor="score">Cast</label>
            <input type="text" name="stars" id="cast" value={movie.stars.join(", ")} onChange={changeHandler} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default UpdateMovie;