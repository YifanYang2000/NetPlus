import React from 'react';
import {Col} from 'antd';

function GridCard(props) {
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{position:'relative'}}>
                <a href={`/movie/${props.movieID}`}>
                    <img style={{width:'100%', heigth:'320px'}} alt src={props.image}/>
                </a>
            </div>
        </Col>
    )
}

export default GridCard;