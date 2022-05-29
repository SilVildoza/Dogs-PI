import React, { useEffect, useState } from 'react';
import { getDogs, getTemperaments, orderFilter, raceFilter, filterTemperaments } from '../../store/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Nav from '../Nav/Nav';
import Paginado from '../Paginado/Paginado';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';

export default function Home(){
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1);
    const [orden, setOrden] = useState("");
    const [dogsPerPage, setDogsPage] = useState(8);
    //const [orderW, setOrderW] = useState('');
    //
    /**
     * El índice del último perro es: la página actual (Default: 1), por la cantidad de perros por página (Default: 9).
     */
    const indexOfLastDog = currentPage * dogsPerPage; // 8
    //|||||||||||||||||||||||||||||||||||||||||||||||
    /**
     * El índice del primer perro es: el índice del último perro (Default: 8), menos la cantidad de perros por página (Default: 9).
     */
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
    //||||||||||||||||||||||||||||||||||||||||||||||||
    /**
     * La constante agarra solo las porciones que estan marcadas en los parámetros, que serían el índice del primer perro (0), hasta el índice del último perro (9), por lo tanto quedarían solo 9 perros por página. Renderizando desde el perro numero 0 hasta el perro numero 8, siendo 9 perros en total. Magic.
     * PÁGINA 1 -> Primer perro 0 <---> Último perro 8.
     * PÁGINA 2 -> Primer perro 9 <---> Último perro 17.
     */
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    //+
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
  }

  function handleFilter(e) {
    e.preventDefault();
    dispatch(orderFilter(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
//   function handleSortByWeight(e){
//     e.preventDefault();
//     dispatch(sortByWeight(e.target.value));
//     setCurrentPage(1);
//     setOrderW(`${e.target.value}`);
//     e.target.value ='default';
//     setOrden(`${e.target.value}`);

// }

  const handleFilterTemperament = (e) => {
    console.log(e.target.value);
    dispatch(filterTemperaments(e.target.value));
    setCurrentPage(1);
  };

  function handleFrom(e) {
    e.preventDefault();
    dispatch(raceFilter(e.target.value));
  }
    return (
        <div>
            <div>
                <Nav />
            </div>
        
            <div>
             <button className='reload' onClick={(e) => {
                handleClick(e);
                }}>
                Reload
             </button>
            
            </div>
            <div className='select-container'>
              <div className='select'>

                <select onChange={(e) => handleFilter(e)} defaultValue="default">
                    <option value="default" disabled="disabled">Sort by:</option>    
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="HIGH" >Heavier</option>
                    <option value="LESS">Lighter</option>
                </select>
              </div>
              {/* <div className='select'>

              <select onChange={(e)=> handleSortByWeight(e)} defaultValue="default">
                <option value="default" disabled="disabled">Sort by Weight</option>
                <option value="ascW" key="ascW">Heavier</option>
                <option value="desW" key="desW">Lighter</option>
            </select>
              </div> */}
                <div className='select'>
                <select onChange={(e) => handleFrom(e)} defaultValue="default">
                    <option value='default' disabled='disabled'>Filter by breeds</option>
                    <option value="all" key="all">ALL</option>
                    <option value="number" key="number">API</option>
                    <option value="notnumber" key="notnumber">Created</option>
                </select>

                </div>
                <div className='select2'>

                <select onChange={(e) => handleFilterTemperament(e)} defaultValue="default">
                    <option value='default' disabled='disabled'>Filter by temperaments</option>
                    <option value="ALL">ALL</option>
                    {temperaments?.map((elem) => (
                    <option value={elem.name} key={elem.id}>
                     {elem.name}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            <Paginado
            dogsPerPage={dogsPerPage}
            dogs={dogs.length}
            paginado={paginado}
            />
             {currentDogs &&
             currentDogs.map((el) => {
               return (
                <div className='cartitas'>
                 <Link to={"/home/" + el.id}>
                <Card
                  name={el.name}
                  image={el.image}
                  weight={el.weight}
                  temperament={el.temperament}
                />
              </Link>
              </div>
                );
             })}
            
        </div>    
        
    )
}