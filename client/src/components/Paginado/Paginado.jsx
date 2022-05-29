import React from "react";
import "./Paginado.css";


export default function Paginado({dogsPerPage,dogs,paginado}){
    const pageNumber =[]

    for (let i = 0; i < Math.ceil(dogs/dogsPerPage); i++) {
        pageNumber.push(i+1)
        
    }

    return (
        <nav>
            <div>
                { pageNumber &&
                pageNumber.map(number =>(
                    
                    <button onClick={()=>paginado(number)}>{number}</button>
                    
                ))}
            </div>
        </nav>
    )
}