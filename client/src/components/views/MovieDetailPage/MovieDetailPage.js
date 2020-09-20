import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import {Descriptions, Button} from 'antd';

function MovieDetailPage(props) {

    const movieID = props.match.params.movieID;
    const [Movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })
    }, []);

    return(
        <div>
            {/* Header */}
            {Movie &&
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title} 
                text={Movie.overview} /> 
            }

            {/* Information */}
            <div style={{width:'85%', margin:'1rem auto'}}>

                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Button>Add to favourite</Button>
                </div>

                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release Date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Average Score" span={2}>{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="Vote Count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br/><br/><br/><br/>

                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button>Toggle Actors</Button>
                </div>

            </div>
            
        </div>
    );
    
}

export default MovieDetailPage;