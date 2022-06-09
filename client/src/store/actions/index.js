import axios from "axios";
export const GET_DOGS= "GET_DOGS";
export const GETBYNAME = "GETBYNAME";
export const GET_BY_ID = "GET_BY_ID";
export const GET_TEMPERAMENTS ="GET_TEMPERAMENTS";
export const POST_DOG = "POST_DOG";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const ORDER_FILTER = "ORDER_FILTER";
export const RACE_FILTER = "RACE_FILTER";
export const CLEAN = "CLEAN";
export const CLEAN_SEARCH = "CLEAN_SEARCH";

export function getDogs(){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs", {});
            return dispatch({
                type: GET_DOGS,
                payload: json.data,
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function getByName(name){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GETBYNAME,
                payload: json.data,
            })
        }catch(error){
            alert("Oops, we couldn't find the breed you requested")
        }
    }
}

export function getById(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogs/${id}`,{});
            return dispatch({
                type: GET_BY_ID,
                payload: json.data,
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function  getTemperaments(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/temperaments");
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data,
        })
    }
}

export function postDog({
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    yearsMin,
    yearsMax,
    image,
    temperament,
}){
    return async function(dispatch){
        await axios.post("http://localhost:3001/dogs/", {
            name,
            height: heightMin + " - " + heightMax,
            weight: weightMin + " - " + weightMax,
            lifeSpan: yearsMin + " - " + yearsMax + " years",
            image,
            temperament,
        });
        dispatch({
            type: POST_DOG,
        });
    }
}

export function filterTemperaments(data){
    return async function (dispatch){
        return dispatch({
            type: FILTER_TEMPERAMENTS,
            payload: data,
        })
    }
}

export function orderFilter(type){
    return async function (dispatch){
        return dispatch({
            type: ORDER_FILTER,
            payload: type,
        })
    }
}

export function raceFilter(payload){
    return {
        type: RACE_FILTER,
        payload
    }
}

export function clean(){
    return async function (dispatch){
        return dispatch({
            type: CLEAN,
        })
    }
}

export function cleanSearch(){
    return async function (dispatch){
        return dispatch({
            type: CLEAN_SEARCH,
        })
    }
}