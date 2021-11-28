const { default: axios } = require('axios');
const { Router} = require('express');
const { Breed, Temperament} = require("../db")
const { YOUR_API_KEY } = process.env;
const express = require('express');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const getApiData = async () => {
    const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = await apiData.data.map(d => {
        return {
            ID : d.id,
            name : d.name,
            height : d.height,
            weight : d.weight,
            life_span : d.life_span
        } 
    });
    return apiInfo;
 };
 
 const getDbData = async () => {
     return await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
         }
     })
 };
 
 const getAllDogs = async () => {
     const apiData = await getApiData();
     const dbData = await getDbData();
     const allData = apiData.concat(dbData);
     return allData;
 };
 

router.get("/dogs", async (req, res) => {
    const name = req.query.name;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); 
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:idRaza", async (req, res) => {
    const idRaza = req.params.idRaza;
    const allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const dog = allDogs.data.filter(d => d.id == idRaza);
    var obj = {
        image: dog[0]?.image,
        name: dog[0]?.name,
        temperament: dog[0]?.temperament,
        height: dog[0]?.height,
        weight: dog[0]?.weight,
        life_span: dog[0]?.lifespan
    }
    dog.length ? res.status(200).send(obj) : res.status(404).send("Dog not found");
})

router.get("/temperament", async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",")
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
    })})

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
    
    
})

router.post("/dog", async (req, res) => {
   let {
    name,
    height,
    weight,
    life_span,
    createdInDB,
    temperaments
   } = req.body

   

   let dog = await Breed.create({
    name,
    height,
    weight,
    life_span,
    createdInDB,
   })

   let temps = await Temperament.findAll({
       where: { name: temperaments}
   })

   dog.addTemperament(temps)

   res.status(200).send("Dog created succesfully!")
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());



module.exports = router;
