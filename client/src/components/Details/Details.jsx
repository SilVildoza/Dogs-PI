import React, { useEffect/* , useState */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getById, clean } from "../../store/actions/index";
import Nav from "../Nav/Nav";
import './Details.css';
//import { Link } from "react-router-dom";


export default function Details(props){
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    //const [/* cambio */, setCambio]= useState(false)
    useEffect(()=>{
        //dispatch(clean())
        dispatch(getById(id)); // sin return se monta
        //setCambio(true)
        return () => {  //con return se desmonta
            dispatch(clean()) //Para que nuestra función se comporte como un componentWillUnmount() tendremos que usar, en el cuerpo de la función, la palabra return. Lo que tenemos que retornar es otra función. Es esta función la que se ejecutará cuando el componente se este por desmontar del DOM.
        }
    },[dispatch,id]);
    const detailDog = useSelector(state=>state.detail);
    
    //console.log(detailDog)
   
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
        <br />
        <br />
        <br />
        <br />
        {/* <Link to="/home">
        </Link> */}
        <button className="back" onClick={() => history.goBack()}>BACK</button>
        </>
    )
}