const { Dog, Temperament } = require("../db");
const { getAllDogs } = require("../controlador")
const axios = require ("axios");
var express = require("express");
var router = express.Router();



router.get("/", async (req, res, next) => {
    try{
        const {name} = req.query;
    let totalDogs = await getAllDogs();

    if (name) {
        let dogName = await totalDogs.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send("This dog doesn't exists")
    } else {
        res.status(200).send(totalDogs)
    }
}
catch (error){
 next(error)
}
});

router.get("/:id", async (req, res) => {
try{  
    const {id} = req.params
    const totalDogs = await getAllDogs()
    if(id){
        let dogId = await totalDogs.filter(d => d.id == id)

        dogId.length?
        res.status(200).json(dogId):
        res.status(400).send('Dog not found')
    }
    }
    catch(error){
        next(error)
    }
})

router.post ("/", async (req, res, next) => {
    let {name, lifeSpan, weight, height, image, temperament } = req.body;
    if (!name || !weight || !height)
    return res.json({
      error:
        "name, weight and height is required to create a new race",
    });
  if (await Dog.findOne({ where: { name: name } }))
    return res.json({
      error: "The name you provided already exists in our database",
    });
    try {
        let postDog = await Dog.create ({
            name, 
            lifeSpan,
            weight,
            height,
            image,
          })
    let temperamentDb = await Temperament.findAll ({
        where: {
            name: temperament 
        }
    })
    postDog.addTemperament(temperamentDb)
    res.send("🐕 New Breed created successfully 🐶")
    }
    catch (error) {
        next(error)
    }
});


module.exports = router;