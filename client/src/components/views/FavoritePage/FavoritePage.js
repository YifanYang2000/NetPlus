import React, {useEffect, useState} from 'react';
import './favorite.css';
import axios from 'axios';
import {Popover, Button} from 'antd';
import {IMAGE_URL} from '../../Config';

function FavoritePage() {

    const [FavoriteMovies, setFavoriteMovies] = useState([]);
    const variables = {
        userFrom: localStorage.getItem('userId')
    };

    const fetchFavoriteMovies = () => {
        axios.post('/api/favorite/getFavoriteMovie', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteMovies(response.data.favorites);
                } else {
                    alert('Failed to get favorites');
                }
            })
    }



    useEffect(() => {
        fetchFavoriteMovies();
    }, []);


    const onClickRemove = (movieId) => {

        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if (response.data.success) {
                    fetchFavoriteMovies();
                } else {
                    alert('Failed to remove from favorites');
                }
            })
    }

    const renderTableBody = FavoriteMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.movieImage ? 
                <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="moviePost"/> 
                : "no image" }
            </div>

        )
        

        return <tr>
            <Popover content={content} title={movie.movieTitle}>
                <td>{movie.movieTitle}</td>
            </Popover>
        
            <td>{movie.movieRunTime}</td>
            <td><Button onClick={() => onClickRemove(movie.movieId)}>Remove</Button></td>
        </tr>
    });


    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h3>My Favorites</h3>
            <hr/><br/>

            <table>
                    <tr>
                        <th class="Title">Movie Title</th>
                        <th class="Time">Runtime</th>
                        <th class="Remov">Remove From Favorites</th>
                    </tr>

                    {renderTableBody}
            </table>

        </div>
    )
}

export default FavoritePage