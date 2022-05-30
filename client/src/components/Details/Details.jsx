import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../store/actions/index";
import Nav from "../Nav/Nav";
import './Details.css';


export default function Details(props){
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getById(id));
    },[dispatch,id]);
    const detailDog = useSelector(state=>state.detail);
    
    console.log(detailDog)
   
    return (
        <>
        <Nav />
        <div>
            {detailDog.length === 0 ? <p Class="loading">Loading...</p>:
            detailDog.length > 0 &&
            <div class="cards">
                <div class="card">
                    <h2 class="card-title">{detailDog[0].name}</h2>
                    <img 
                    src={detailDog[0].image}
                    alt='img not found'                    
                    />
                <div class="card-desc">
                    <h4>Temperaments:</h4>
                    <p>{detailDog[0].temperament}</p>
                    <br/>
                    <h4>Height:</h4>
                    <p>{detailDog[0].height} cm</p>
                    <br/>
                    <h4>Weight:</h4>
                    <p>{detailDog[0].weight} kg</p>
                    <br/>
                    <h4>Life Span:</h4>
                    <p>{detailDog[0].lifeSpan}</p>                    
                </div>
                </div>               
            </div>
            }
        </div>
        </>
    )
}