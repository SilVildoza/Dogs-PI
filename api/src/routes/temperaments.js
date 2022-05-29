const { Router } = require('express');
const axios = require ("axios");
const {Temperament} = require('../db');
//const { API_KEY } = process.env;
const { URL_DOG } = require("../urls");

const router = Router();

router.get('/', async (req, res) => {
    try{
        const temperamentApi = await axios.get(`${URL_DOG}`)     
        const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ")
    
        temperament.forEach(el=> {
            Temperament.findOrCreate ({
                where:{name:el}
            })
        });
        const dogTemperament = await Temperament.findAll();
        res.send(dogTemperament)
        //console.log(dogTemperament)
        }
        catch(error){
            console.log(error)
        }
    
});


module.exports = router;