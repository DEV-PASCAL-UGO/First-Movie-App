import React from 'react';
import {useState, useEffect} from 'react';
import MovieCard from './MovieCard'; 
import './App.css';
import searchIcon from './search.svg';

//28446ff6


const API_URL= 'http://www.omdbapi.com/?i=tt3896198&apikey=28446ff6';

const movie1= {
    "Title": "Amazing Spiderman Syndrome",
    "Year": "2012",
    "imdbID": "tt2586634",
    "Type": "movie",
    "Poster": "N/A"
}
const App = () => {
    const [movies, setMovies]= useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    
    const searchMovies = async (title) => {
       try{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setMovies(data.Search);
       } catch(error){
        console.log('opps an error occored', error)
       }
    }


    useEffect(()=>{
        searchMovies('spiderman');
    },[]);

    return (
    <div className="app">
        <h1>MovieLand</h1>
        
        <div className="search">
            <input 
                placeholder="serach for movies" 
                value={searchTerm} 
                onChange={(e)=> setSearchTerm(e.target.value)}
            />
            <img 
                src={searchIcon}
                alt="search"
                onClick={()=> searchMovies(searchTerm)}
            /> 
        </div>
        
        { movies?.length > 0 
            ? (
        <div className="container ">
            {movies.map((movie) => (
                <MovieCard movie={movie}/> 
            ))}
        </div>
            ) : (
            <div> <h2> No movies found </h2></div>
            )}

        </div> 
        
        )
    }

export default App;