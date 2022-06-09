import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getById, clean } from "../../store/actions/index";
import Nav from "../Nav/Nav";
import './Details.css';
import carga from '../../img/funnygifsbox.com-2020-11-16-10-37-09-3.gif';


export default function Details(props){
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getById(props.match.params.id));        
        return () => {  
            dispatch(clean()) 
        }
    },[dispatch,props.match.params.id]);
    
    const detailDog = useSelector(state=>state.detail);
    
    console.log(detailDog)
   
    return (
        <>
        <Nav />
        <div>
            
            {detailDog.length === 0 ? <img className='load' alt="Loading" src={carga}/>:
            detailDog.length > 0 &&
            <div className="cards">
                <div className="card">
                    <h2 className="card-title">{detailDog[0].name}</h2>
                    <img 
                    src={detailDog[0].image}
                    alt='img not found'                    
                    />
                <div className="card-desc">
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
        <br />
        <br />
        <br />
        <br />
        <button className="back" onClick={() => history.goBack()}>BACK</button>
        </>
    )
}
