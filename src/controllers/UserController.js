const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController {
    async create(req, res) {
        try{
            console.log(req.body);
            const user = await User.create(req.body);
            return res.status(201).json({message: "User has been successfully registered!", user: user});
            }catch(err){
            res.status(500).json({error: err});
        }
    }

    async index(req, res) {
        try{
            const users = await User.findAll()
            return res.status(200).json(users)
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async show(req, res) {
        try{
            const {id} = req.params;
            const user = await User.findByPk(id);
            return res.status(200).json(user);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async update(req, res) {
        try{
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
}

module.exports = new UserController();
