import React, { useEffect, useState } from "react";
import {
  getDogs,
  getTemperaments,
  orderFilter,
  raceFilter,
  filterTemperaments,
  cleanSearch,
} from "../../store/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import Paginado from "../Paginado/Paginado";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import carga from "../../img/funnygifsbox.com-2020-11-16-10-37-09-3.gif";

export default function Home() {
  
  const dispatch = useDispatch(); 
  const dogs = useSelector((state) => state.dogs); 
  const temperaments = useSelector((state) => state.temperaments);

  //* PAGINADO
  const [currentPage, setCurrentPage] = useState(1); 
  const [, /* orden */ setOrden] = useState("");
  const [dogsPerPage /* setDogsPage */] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage; // 8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
    return()=>{
      dispatch(cleanSearch())
    }
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
    e.target.value = "default";
  }

  const handleFilterTemperament = (e) => {
    console.log(e.target.value);
    dispatch(filterTemperaments(e.target.value));
    setCurrentPage(1);
    e.target.value = "default";
  };

  function handleFrom(e) {
    e.preventDefault();
    dispatch(raceFilter(e.target.value));
    setCurrentPage(1);
    e.target.value = "default";
  }
  
  return (
    <div>
      <div>
        <Nav />
      </div>

      <div>
        <button
          className="reload"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload
        </button>
      </div>
      <div className="select-container">
        <div className="select">
          <select onChange={(e) => handleFilter(e)} defaultValue="default">
            <option value="default" disabled="disabled">
              Sort by:
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="HIGH">Heavier</option>
            <option value="LESS">Lighter</option>
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => handleFrom(e)} defaultValue="default">
            <option value="default" disabled="disabled">
              Filter by breeds
            </option>
            <option value="all" key="all">
              ALL Sources 🐶
            </option>
            <option value="number" key="number">
              Existing breeds 🐶
            </option>
            <option value="notnumber" key="notnumber">
              Created breeds 🐶
            </option>
          </select>
        </div>
        <div className="select2">
          <select
            onChange={(e) => handleFilterTemperament(e)}
            defaultValue="default"
          >
            <option value="default" disabled="disabled">
              Filter by temperaments
            </option>
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
      {currentDogs.length === 0 ? (
        <img className="load" alt="Loading" src={carga} />
      ) : (
        currentDogs?.map((el) => {
          return (
            <div className="cartitas">
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
        })
      )}
      <br />
      <br />
      <Link to="/">
        <button className="reload">
          <span>Welcome Page</span>
        </button>
      </Link>
    </div>
  );
}
