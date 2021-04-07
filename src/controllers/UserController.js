const { response } = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const Cellphone = require('../models/Cellphone');

class UserController {
    async create(req, res) {
        try{
            validationResult(req).throw(); //validação
            console.log(req.body);
            const user = await User.create(req.body);
            return res.status(201).json({message: "User has been successfully registered!", user: user});
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    async index(req, res) {
        try{
            const users = await User.findAll({
                include: [{
                    model: Event
                },{
                    model:Cellphone
                }]
            });
            return res.status(200).json(users)
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async show(req, res) {
       
            const {id} = req.params;
            const user = await User.findByPk(id,{
                include: [{
                    model: Event
                },{
                    model:Cellphone
                }]
            });
            return res.status(200).json(user);

    }

    async update(req, res) {
        try{
            validationResult(req).throw();//validação
            const {id} = req.params;
            const user = await User.findByPk(id);
            if(!user){
                throw new Error({message:'User not found'});
            }
            if(req.body.password){
                user.password_hash = await bcrypt.hash(req.body.password,8);
                await user.save();
            }
            await User.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "Information succesfully updated!", user: user});
        }catch(err){
            return res.status(404).json(err);
        }    
    }
    async delete(req,res) {
        const {id} = req.params;
        console.log(id);
        try{
            const user = await User.findByPk(id);
            const deleted = await User.destroy({where: {id: id}});
            if(!deleted){
                throw new Error('User not found');
            }
            return res.status(200).json({message: 'User successfully deleted!', user:user});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async subscribeToEvent(req,res) {
        const {userId,eventId} = req.params;
        const user = await User.findByPk(userId);
        const event = await Event.findByPk(eventId);
        user.addEvent(event,{through: 'UserEvent'});
        return res.status(200).json('User has subscribe to selected event.');
    }

    async unsubscribeFromEvent(req,res) {
        const {userId,eventId} = req.params;
        const user = await User.findByPk(userId);
        const event = await Event.findByPk(eventId);
        user.removeEvent(event,{through: 'UserEvent'});
        return res.status(200).json('User has unsubscribe from selected event.');
    }

    async acquireCellPhone(req,res) {
        const {userId,cellphoneId} = req.params;
        const user = await User.findByPk(userId);
        const cellphone = await Cellphone.findByPk(cellphoneId);
        console.log(cellphone);
        user.setCellphone(cellphone);
        return res.status(200).json('User has acquired a new cellphone.');
    }

    async throwAwayCellPhone(req,res) {
        const {userId,cellphoneId} = req.params;
        const user = await User.findByPk(userId);
        const cellphone = await Cellphone.findByPk(cellphoneId);
        user.setCellphone(null);
        return res.status(200).json('User has thrown away his cellphone.');
    }
}

module.exports = new UserController();
