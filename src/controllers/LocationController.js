const Location = require('../models/Location');
const {validationResult} = require('express-validator');

class LocationController {
    async create(req,res) {
        try{
            validationResult(req).throw();
            const location = await Location.create(req.body);
            return res.status(201).json({message: 'Location created successfully!',location:location});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async index(req,res) {
        try{
            const locations = await Location.findAll();
            return res.status(200).json(locations);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async show(req,res) {
        try{
            const {id} = req.params; 
            const location = await Location.findByPk(id);
            return res.status(200).json(location);
        }catch(err){
            return res.status(500).json(err);
        } 
    }

    async update(req,res) {
        try{
            validationResult(req).throw();
            const {id} = req.params;
            console.log(id);
            console.log(req.body);
            const [updatedLocation] = await Location.update(req.body, {where: {id:id}});
            console.log('aaaaa');
            if(!updatedLocation){
                return res.status(500).json('Location not found');
            }
            const location = await Location.findByPk(id);
            return res.status(200).json({message: 'Location successfully updated', location: location});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async delete(req,res) {
        try{
            const {id} = req.params;
            const location = await Location.findByPk(id);
            const deletedLocation = await Location.destroy({where:{id:id}});
            return res.status(200).json({message: 'Location successfully deleted', location: location});
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

module.exports = new LocationController();