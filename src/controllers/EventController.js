const { response } = require('express');
const Event = require('../models/Event');

class EventController {
    async create(req,res) {
        try{
            const event = await Event.create(req.body);
            return res.status(201).json({message: 'Event created successfully!',event:event});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async index(req,res) {
        try{
            const events = await Event.findAll();
            return res.status(200).json(events);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async show(req,res) {
        try{
            const {id} = req.params; 
            const event = await Event.findByPk(id);
            return res.status(200).json(event);
        }catch(err){
            return res.status(500).json(err);
        } 
    }

    async update(req,res) {
        try{
            const {id} = req.params;
            console.log(id);
            console.log(req.body);
            const [updatedEvent] = await Event.update(req.body, {where: {id:id}});
            console.log('aaaaa');
            if(!updatedEvent){
                return res.status(500).json('Event not found');
            }
            const event = await Event.findByPk(id);
            return res.status(200).json({message: 'Event successfully updated', event: event});
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async delete(req,res) {
        try{
            const {id} = req.params;
            const event = await Event.findByPk(id);
            const deletedEvent = await Event.destroy({where:{id:id}});
            return res.status(200).json({message: 'Event successfully deleted', event: event});
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

module.exports = new EventController();