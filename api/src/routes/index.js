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
        const temperaments = d.temperament?.toString().split(",")
        const fixedTemps = []
        temperaments?.forEach((el) => {
            fixedTemps.push({"name" : el.trim()})
        })
        // temperaments?.forEach(el => {
        //     fixedTemps.push(el.trim().forEach((el) => {
        //         let obj = { "name": el}
        //     }))
        // })
        const fixedHeight = []
        d.height.metric.split("-")?.forEach(el => {
            fixedHeight.push(el.trim())
        })
        const fixedWeight = []
        d.weight.metric.split("-")?.forEach(el => {
            fixedWeight.push(el.trim())
        })
        return {
            ID : d.id,
            name : d.name,
            height : fixedHeight,
            weight : fixedWeight,
            life_span : d.life_span,
            temperaments : fixedTemps,
            image: d.image.url,
            api: true
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
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(d => d.ID == idRaza);
    dog.length? 
    res.status(200).json(dog): 
    res.status(404).send("Dog not found");
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
    temperaments,
    image
   } = req.body

   const fixedWeight = []
        weight.split("-")?.forEach(el => {
            fixedWeight.push(el.trim())
        })

   let dog = await Breed.create({
    name,
    height,
    weight: fixedWeight,
    life_span,
    createdInDB,
    image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    //temps: temperaments
   })

   let associatedTemp = await Temperament.findAll({
       where: { name: temperaments},
   })

   dog.addTemperament(associatedTemp)

   res.status(200).send("Dog created succesfully!")
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());



module.exports = router;
