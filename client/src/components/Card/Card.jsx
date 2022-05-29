import React from 'react';
// import { useDispatch } from 'react-redux';
// import {Link} from "react-router-dom";
// import { getById } from '../../store/actions/index';
import './Card.css';

export default function Card({name,image,temperament,weight}){
   // const dispatch = useDispatch();

    if(!temperament){
        temperament = "None"
    }

    return (
        <>
        <div class="flip-card-container" >
            <div class="flip-card">
                <div class="card-front">

                <figure>
                    <div class="img-bg"></div>
                        <img src={image} alt="img not found" />
                        <figcaption>{name}</figcaption>
                </figure>
                <ul>
                    <li>{temperament}</li>
                    <li>{weight} kg</li>
                </ul>
                </div>

                <div class="card-back">
                    <figure>
                        <div class="img-bg"></div>
                        <img src={image} alt="img not found" />
                    </figure>
                        <button>See More</button>
                    {/* <Link to={`/home/:${id}`} onClick={()=>dispatch(getById(id))}>
                    </Link> */}
                    
                    <div class="design-container">
                        <span class="design design--1"></span>
                        <span class="design design--2"></span>
                        <span class="design design--3"></span>
                        <span class="design design--4"></span>
                        <span class="design design--5"></span>
                        <span class="design design--6"></span>
                        <span class="design design--7"></span>
                        <span class="design design--8"></span>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='card-container'>
        <img className='img-card' src={image} alt={name}/>
        <div className='card-info'>
        <h3 className='name-txt'>{name}</h3>
        <div className='card-info-text'>
        <h5 className='info-txt'>Temperaments: </h5>
        <span className='info-txt'>{temperament}</span>
        <h5 className='info-txt'>Weight: </h5>
        <span className='info-txt'>{weight} kg</span>
        </div>
        </div>
        </div> */}
        </>
        // <li className='format'>
        //     <h3 className='name'>{name}</h3>
        //     <img className='image' src={image} alt={name}/>
        //     <h5>Temperaments: </h5>
        //     <span>{temperament}</span>
        //     <h5>Weight: </h5>
        //     <span>{weight} kg</span>
        // </li>
    )
}