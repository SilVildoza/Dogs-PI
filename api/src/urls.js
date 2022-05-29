require('dotenv').config();
const { API_KEY }= process.env;
const URL_RAZA='https://api.thedogapi.com/v1/breeds';
const URL_SEARCH=`https://api.thedogapi.com/v1/breeds/search?q={raza_perro}`;
const URL_DOG=`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

module.exports={
    URL_RAZA,
    URL_SEARCH,
    URL_DOG
}