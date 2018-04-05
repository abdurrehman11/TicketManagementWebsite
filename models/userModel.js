const db = require('../configs/db');
const Sequelize=require('sequelize');
const sequelize = db.sequelize;
const Op = Sequelize.Op;

class UserModel {
    constructor() {
        this.User = sequelize.define('Users', {
            firstname: {
                type: Sequelize.STRING, allowNull: false
            },
            lastname: {
                type: Sequelize.STRING, allowNull: false
            },
            username: {
                type: Sequelize.STRING, unique: true, allowNull: false
            },
            email: {
                type: Sequelize.STRING, unique: true, allowNull: false
            },
            contact: {
                type: Sequelize.STRING, allowNull: false
            }, 
            password: {
                type: Sequelize.STRING, allowNull: false
            },
            productImage: {
                type: Sequelize.STRING, allowNull: false
            }
        }, {
            timestamps: false,   // don't add the timestamp attributes (updatedAt, createdAt)
            freezeTableName: true   // disable the modification of table names
        });

        // Create the table
        this.User.sync().then(() => {
            console.log('Users Table Created');
        });
    }

    create(data) {
        // copy object
        let defaultVals = Object.assign({}, data);
        return this.User
            .findOrCreate({where: {
                [Op.or]: [{username: data.username}, {email: data.email}]
            }, defaults: defaultVals})
            .spread((user, created) => {
                console.log(user.get({
                    plain: true
                }))
                return created;

            }).catch(err => err);
    }

    get(id) {
        console.log(id);
        return this.User.findOne({attributes: ['username', 'email', 'productImage'], where: {id: id}}).
                then(user => {
                    if(user) {
                        return {success: true, message: user};
                    } else {
                        return {success: false, message: 'Not found'};
                    }
                }).catch((err) => {
                    return {success: false, message: err};
                });
    }

}

module.exports = new UserModel();