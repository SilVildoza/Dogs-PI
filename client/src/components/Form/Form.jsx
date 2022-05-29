import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../store/actions";
import Nav from "../Nav/Nav";
import './Form.css';

function validate(newBreed){
    let errors = {}
    if(!newBreed.name){
        errors.name = 'Must enter a name'
    } else if(parseInt(newBreed.name)){
        errors.name = 'Numbers are not allowed in the name'
    }
    if(newBreed.heightMin && newBreed.heightMin <= 0){
        errors.numberMinHeight = 'The Minimun height should be higher than 0!'
    }
    if(newBreed.heightMax && (newBreed.heightMax > 500 || parseInt(newBreed.heightMin) > parseInt(newBreed.heightMax))){
        errors.numberMaxheight = `${newBreed.heightMax} cm is a weird height for a dog!`
    }
    if(newBreed.weightMin && newBreed.weightMin <= 0){
        errors.numberMinWeight = 'The Minimun weight should be higher than 0!'
    }
    if(newBreed.weightMax && (newBreed.weightMax > 500 || parseInt(newBreed.weightMin) > parseInt(newBreed.weightMax))){
        errors.numberMaxweight = `${newBreed.weightMax} kg is a weird weight for a dog!`
    }
    if(!newBreed.image){
        errors.image = 'Image required'
    }
    if(!newBreed.yearsMin || !newBreed.yearsMax){
        errors.years = 'Life Span is required'
    }else if(newBreed.yearsMin < 1 || newBreed.yearsMax >20){
        errors.years = 'Write a number beetween 1 - 20'
    }
    if(!newBreed.temperaments){
        errors.temperaments = 'At least 1 temperament ir required'
    }
    return errors
}
export default function Form(){
    const [newBreed, setNewBreed] = useState({name: '', heightMin:'', heightMax: '', weightMin: '', weightMax: '', yearsMin:'', yearsMax: '', image: '', temperament: []});
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [errors, setErrors] = useState({});

    console.log(newBreed)
    useEffect(()=>{
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e){
        setNewBreed({
            ...newBreed,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...newBreed,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        let hayTemp = newBreed.temperament.find(temp => temp === e.target.value)
        if(!hayTemp){
            setNewBreed({
                ...newBreed,
                temperament: [...newBreed.temperament,e.target.value]
            });
        } else alert ("Temperament already selected...!");
        e.target.value = 'default'
    };

    function handleDeleteB(t){
        setNewBreed({
            ...newBreed,
            temperament: newBreed.temperament.filter(temp => temp !== t)
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        if(newBreed.heightMin > 0 && newBreed.weightMin > 0 && parseInt(newBreed.heightMax) > parseInt(newBreed.heightMin) && parseInt(newBreed.weightMax) > parseInt(newBreed.weightMin) && newBreed.name && /^[a-z ,.'-]+$/i.test(newBreed.name) && parseInt(newBreed.yearsMax) > parseInt(newBreed.yearsMin)){
            dispatch(postDog(newBreed));
            alert("🐕 New Breed was successfully created 🐶");
            setNewBreed({name: '', heightMin:'', heightMax: '', weightMin: '', weightMax: '', yearsMin:'', yearsMax: '', image: '', temperament: []});    
        }else{
            alert("Oops, there seems to be a problem. Check the data")
        }
    };


    return (
        <div className="body-form">
            <Nav />
            <div className="form-container">
                <div className="title">
                    <h3> Create a new breed</h3>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                    <label>Name</label>
                      <input placeholder="Name of the breed..." className="input" type="text" name="name" value={newBreed.name} onChange={handleChange} autoComplete="off" required/>
                      {/* <div className="h2e">
                      {errors.name && <p className="error">{errors.name}</p>}
                      </div> */}
                      <br />
                        { errors.name && 
                            <span className="error">{errors.name}</span>
                        } 
                    </div>
                    <div className="input-field">
                        <label>Min Height (cm): </label>
                        <input className="input" placeholder="Minimum height of the breed..." type="number" name="heightMin" value={newBreed.heightMin} onChange={handleChange} autoComplete="off" required />
                        <br />
                        { errors.numberMinHeight && 
                            <span className="error">{errors.numberMinHeight}</span>
                        } 
                    </div>
                    <div className="input-field">
                        <label>Max Height (cm): </label>
                        <input className="input" placeholder="Maximum height of the breed..." type="number" name="heightMax" value={newBreed.heightMax} onChange={handleChange} autoComplete="off" required />
                        <br />
                        { errors.numberMaxheight && 
                            <span className="error">{errors.numberMaxheight}</span>
                        }   
                    </div>
                    <div className="input-field">
                        <label>Weight min (kg): </label>
                        <input className="input" placeholder="Minimum weight of the breed..." type="number" name="weightMin" value={newBreed.weightMin} onChange={handleChange} autoComplete="off" required/>
                        <br />
                        { errors.numberMinWeight && 
                            <span className="error">{errors.numberMinWeight}</span>
                        } 
                    </div>
                    <div className="input-field">
                        <label>Weight max (kg): </label>
                        <input className="input" placeholder="Maximum weight of the breed..." type="number" name="weightMax" value={newBreed.weightMax} onChange={handleChange} autoComplete="off" required />
                        <br />
                        { errors.numberMaxweight && 
                            <span className="error">{errors.numberMaxweight}</span>
                        } 
                    </div>
                    <div className="input-field">
                        <label>Min Life Span: </label>
                        <input className="input" placeholder="Minimum life span of the breed..." type="number" name="yearsMin" value={newBreed.yearsMin} onChange={handleChange} autoComplete="off" />
                        {/* <div className="h2e">
                            {errors.years && (<p className="error">{errors.years}</p>)}
                        </div> */}
                        <br />
                        { errors.years && 
                            <span className="error">{errors.years}</span>
                        } 
                    </div>
                    <div className="input-field">
                        <label>Max Life Span: </label>
                        <input className="input" placeholder="Maximum life span of the breed..." type="number" name="yearsMax" value={newBreed.yearsMax} onChange={handleChange} autoComplete="off" />
                        {/* <div className="h2e">
                            {errors.years && (<p className="error">{errors.years}</p>)}
                        </div> */}
                        <br />
                        { errors.years && 
                            <span className="error">{errors.years}</span>
                        } 
                    </div>
                    <div className="input-field">
                      <label>Picture</label>
                      <input className="input" placeholder="Add an image URL for your breed..." type="url" name="image" onChange={handleChange} value={newBreed.image} autoComplete="off" />
                      {/* <div className="h2e">
                          {errors.image && (<p className="error">{errors.image}</p>)}
                      </div> */}
                      <br />
                        { errors.image && 
                            <span className="error">{errors.image}</span>
                        } 
                    </div>
                    <div className="form-group">
                        <label>Temperaments: </label>
                        <div className="temps">
                            <select defaultValue="default" onChange={(e)=>{handleSelect(e)}}>
                                <option value="default" disabled="default">Choose at least 1 temperament</option>
                                {temperaments && temperaments.map(d => (
                                   <option key={d.name} value={d.name}>
                                  {d.name}
                              </option>
                                 ))}
                                 {errors.temperaments && (<p className="error">{errors.temperaments}</p>)}
                            </select>
                            <ul>
                            <label>Selected temperaments: </label>
                            <div>
                            {newBreed.temperament.map((t) => (
                                <div key={t}>
                                <ul className="elegido">{t}</ul>
                                <button className="crucecita" onClick={() => handleDeleteB(t)}>x</button>
                                </div>
                            ))}
                            </div>
                            </ul>
                        </div>
                    </div>
                    <div className="input-field">
                     <button className="input" type="submit">
                     <span>SUBMIT</span>
                     </button>
                   </div>
                </form>
            </div>
        </div>
    )
}