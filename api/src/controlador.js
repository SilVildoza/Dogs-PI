const {Router} = require ("express");
const axios = require ("axios");
const { Dog, Temperament } = require("./db");
const {API_KEY} = process.env;
const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await apiUrl.data.map(el => {
        
        return {
            name: el.name,
            id: el.id,
            lifeSpan: el.life_span,
            temperament: el.temperament,
            height: el.height.metric,
            weight: el.weight.metric,
            image: el.image.url,
            
        }
    });
    return apiInfo;
};

const getDbInfo = async () => {
   
    let myDB = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    let aux= myDB.map(d=>{
        return{
            id:d.id,
            name:d.name,
            lifeSpan:d.lifeSpan,
            temperament:d.dataValues.temperaments.map(t => t.name).join(', '),
            height:d.height,
            weight:d.weight,
            image:d.image
        }
    })
    return aux
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

module.exports = {
    getAllDogs
}