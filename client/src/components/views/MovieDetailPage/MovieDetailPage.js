import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import {Descriptions, Button, Row} from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite';

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Crew, setCrew] = useState([]);
    const [Actor, setActor] = useState(false);

    const handleClick = () => {
        setActor(!Actor);
    };

    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setCrew(response.cast)
                })
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

            {/* Information Section*/}
            <div style={{width:'85%', margin:'1rem auto'}}>

                {/* Favourite button */}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Favorite userFrom={localStorage.getItem('userId')}
                              movieId={movieId}
                              movieInfo={Movie}/>
                </div>

                {/* Information table*/}
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

                {/* Toggle Actors button */}
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button onClick={handleClick}>Toggle Actors</Button>
                </div>

                <br/><br/>

                {/* Grid cards for actors */}
                {Actor && 
                    <Row gutter={[16, 16]}>
                        {Crew && Crew.map((crew, index) => (
                            <React.Fragment key={index}>
                                {crew.profile_path &&
                                    <GridCard
                                        actor image = {`${IMAGE_URL}w500${crew.profile_path}`}
                                    />
                                }
                            </React.Fragment>
                        ))};
                    </Row>
                }

            </div>
            
        </div>
    );
    
}

export default MovieDetailPage;