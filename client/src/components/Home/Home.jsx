import React, { useEffect, useState } from 'react';
import { getDogs, getTemperaments, orderFilter, raceFilter, filterTemperaments } from '../../store/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Nav from '../Nav/Nav';
import Paginado from '../Paginado/Paginado';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';

export default function Home(){
    //*Los Hooks son algunas herramientas adicionales de React que nos permiten trabajar con componentes de funciones. Estos se encargan de copiar todos los recursos que tienen los componentes de clase pero en los de funciones.
    const dispatch = useDispatch();  //Esta función se iguala a una constante. Esta constante ahora será la palabra clave cuando queramos despachar una función. Es decir que, contrariamente a useSelector, esta función la usaremos sólo cuando queramos despachar acciones y no necesitemos mostrar información del estado.
    const dogs = useSelector((state) => state.dogs); // useSelector: Esta función nos permite consumir información del estado del componente, la usaremos sólo cuando queramos mostrar información del estado pero no querer despachar acciones. Esta función es comparable con mapStateToProps.
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1); // useState Nos permite guardar estados en los componentes de funciones. devuelve un arreglo con dos valores. El primero es una variable con el valor del estado y el segundo es una función que se usa para modificar el estado.
    const [/* orden */, setOrden] = useState("");
    const [dogsPerPage, /* setDogsPage */] = useState(8);
    
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
     * PÁGINA 1 -> Primer perro 0 <---> Último perro 7.
     * PÁGINA 2 -> Primer perro 8 <---> Último perro 16.
     */
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    //+
    
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  useEffect(() => {  //useEffect: Esta función viene a reemplazar las funciones del ciclo de vida de los componentes de clase.
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
    e.target.value = 'default'
  }

  const handleFilterTemperament = (e) => {
    console.log(e.target.value);
    dispatch(filterTemperaments(e.target.value));
    setCurrentPage(1);
    e.target.value = 'default'
  };

  function handleFrom(e) {
    e.preventDefault();
    dispatch(raceFilter(e.target.value));
    setCurrentPage(1);
    e.target.value = 'default'
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
             <Link to='/' ><button className='reload'><span>Welcome Page</span></button></Link> 
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