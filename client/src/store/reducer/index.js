import { GET_DOGS, GETBYNAME, GET_BY_ID, GET_TEMPERAMENTS,POST_DOG, FILTER_TEMPERAMENTS, CLEAN, CLEAN_SEARCH, ORDER_FILTER, RACE_FILTER } from "../actions/index";

const initialState = {
    dogs: [],
    copiaDogs: [],
    temperaments: [],
    detail: [],
};

function weightA(a){
    let arrayA = a.weight.split('-');
    if(parseInt(arrayA[0]) && parseInt(arrayA[1])) return (parseInt(arrayA[0]) + parseInt(arrayA[1]))/2;
    if(arrayA[0].trim() === 'NaN' && !arrayA[1]) return 30;
    if(!parseInt(arrayA[0]) || arrayA[0].trim() === 'NaN') return parseInt(arrayA[1]);
    if(!parseInt(arrayA[1]) || arrayA[1].trim() === 'NaN' ) return parseInt(arrayA[0]);
}
    
function weightB(b){
    let arrayB = b.weight.split('-');    
    if(parseInt(arrayB[0]) && parseInt(arrayB[1])) return (parseInt(arrayB[0]) + parseInt(arrayB[1]))/2;
    if(arrayB[0].trim() === 'NaN' && !arrayB[1]) return 30;
    if(!parseInt(arrayB[0]) || arrayB[0].trim() === 'NaN') return parseInt(arrayB[1]);
    if(!parseInt(arrayB[1]) || arrayB[1].trim() === 'NaN' ) return parseInt(arrayB[0]);
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                copiaDogs: action.payload,
            };
        case GETBYNAME:
            return {
                ...state,
                dogs: action.payload,
            };
        case GET_BY_ID:
            return {
                ...state,
                detail: action.payload,
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            };    
        case POST_DOG:
            return {
                ...state,                
            }
        case FILTER_TEMPERAMENTS:
            let allDogs = state.copiaDogs;
            let tempFiltered = 
            action.payload === "ALL"
            ? allDogs
            : allDogs.filter((elem)=>
            elem.temperament?.includes(action.payload));
            return {
                ...state,
                dogs: tempFiltered,
            };
        case ORDER_FILTER:
            let info = state.copiaDogs;
            let sorted =
            action.payload === "A-Z"
            ? info.sort(function (a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
            : action.payload === "Z-A"
            ? info.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            : action.payload === "HIGH"
            ? info.sort(function(a,b){
                return weightA(b) - weightB(a)
                //return weightB(b) - weightA(a)
            })
            : info.sort(function(a,b){
                //return weightB(a) - weightA(b)
                return weightA(a) - weightB(b)                
            });
            return {
                ...state,
                dogs: sorted,
            };    
        case RACE_FILTER:
            let dogs = state.copiaDogs;
            let raceFilter;
            if(action.payload === "all"){
                raceFilter = state.copiaDogs;
            }else{
                if(action.payload === "number"){
                    raceFilter = dogs.filter(d => !isNaN(d.id));
                }else{
                    raceFilter = dogs.filter(d => isNaN(d.id));
                }
            }
            return {
                ...state,
                dogs: raceFilter
            }
        case CLEAN:
            return {
                ...state,
                detail: []
            };
            case CLEAN_SEARCH:
                return {
                    ...state,
                    dogs: []
                };    
        default:
            return state;
    }
}

export default rootReducer;