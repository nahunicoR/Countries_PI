const { Router } = require('express');
const {Country, Activity} = require('../db.js');
const {Op} = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req,res,next) => {
    const {name} = req.query;
    try{
        if(name){
            const countries = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            });
            return res.status(200).send(countries);
        }
        const countries = await Country.findAll({
            include: Activity
        });
        res.status(200).send(countries);
    } catch (error){
        next(error)
    }
});

router.post('/activities', async (req,res,next) => {

    const {name, difficulty, duration, season, countries} = req.body;
    
    try{
        if(!name || !difficulty || !duration || !season || !countries.length > 0){
            return res.status(400).send('Falta información');
        }
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        countries.forEach(async (country) => {
            let activityCountry = await Country.findOne({
                where: {
                    name: country
                }
            }) 
            await newActivity.addCountry(activityCountry)
        });
        res.status(200).send('La actividad se creo exitosamente')
    } catch(error) {
        next(error)
        res.status(400).send('No se pudo crear la actividad');
    }
});

router.get('/countries/:id', async(req,res,next) => {
    
    const idCountry = req.params.id.toUpperCase();
    console.log(idCountry);
    try{
        const countryById = await Country.findByPk(idCountry, {
            include: Activity
        });
        res.status(200).send(countryById);
    } catch(error){
        next(error)
    }
});

router.get('/activities', async (req,res,next) => {
    try{
        const activities = await Activity.findAll({
            include: Country
        });
        res.status(200).send(activities);
    }   catch(error){
        next(error)
    }
});

router.delete('/activities/:id', async (req,res,next) => {
    //por id
    const idActivity = req.params.id;
    try{
        const activity = await Activity.findByPk(idActivity);
        await activity.removeCountries(activity.countries);
        await activity.destroy();
        res.status(200).send('Actividad eliminada');
    }
    catch(error){
        next(error)
    }
});

router.delete('/countries', async (req,res,next) => {
    //by name
    const {name} = req.query;
    try{
        const activity = await Activity.findOne({
            where: {
                name
            }
        });
        await activity.removeCountries(activity.countries);
        await activity.destroy();
        res.status(200).send('Actividad eliminada');
    }
    catch(error){
        next(error)
    }
});



module.exports = router;
