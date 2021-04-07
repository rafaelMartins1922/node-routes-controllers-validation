const DataTypes = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/sequelize');
const { beforeSave } = require('./Event');

const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNulll:false,
            defaultValue: ''
        },
        name: {
            type:DataTypes.STRING,
            allowNulll:true,
            defaultvalue:''
        },
        password_hash: {
            type:DataTypes.STRING,
            allowNulll:false,
        },
        password: {
            type:DataTypes.VIRTUAL,
            allowNulll:false,
        }
    },{
        hooks: {
            beforeSave: async user => {
              if(user.password){
                  user.password_hash = await bcrypt.hash(user.password,8);
              } 
            }
        }
    }
);

User.associate = function(models) {
    User.belongsToMany(models.Event,{through:'UserEvent'});
}

module.exports = User;