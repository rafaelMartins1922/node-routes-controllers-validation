const Cellphone = require('../models/Cellphone');
const {validationResult} = require('express-validator');

class CellphoneController {
    async create(req,res) {
        try{
            validationResult(req).throw();
            const cellphone = await Cellphone.create(req.body);
            return res.status(201).json({message: 'Cellphone created successfully!',cellphone:cellphone});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async index(req,res) {
        try{
            const cellphones = await Cellphone.findAll();
            return res.status(200).json(cellphones);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async show(req,res) {
        try{
            const {id} = req.params; 
            const cellphone = await Cellphone.findByPk(id);
            return res.status(200).json(cellphone);
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
            const [updatedCellphone] = await Cellphone.update(req.body, {where: {id:id}});
            console.log('aaaaa');
            if(!updatedCellphone){
                return res.status(500).json('Cellphone not found');
            }
            const cellphone = await Cellphone.findByPk(id);
            return res.status(200).json({message: 'Cellphone successfully updated', cellphone: cellphone});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async delete(req,res) {
        try{
            const {id} = req.params;
            const cellphone = await Cellphone.findByPk(id);
            const deletedCellphone = await Cellphone.destroy({where:{id:id}});
            return res.status(200).json({message: 'Cellphone successfully deleted', cellphone: cellphone});
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

module.exports = new CellphoneController();