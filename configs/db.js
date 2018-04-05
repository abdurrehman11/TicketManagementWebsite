const Sequelize=require('sequelize');

    const sequelize = new Sequelize('eventticketing', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql'

    });


    sequelize
        .authenticate()
        .then(function () {
            console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
            console.error('Unable to connect to the database:', err);
        });


exports.sequelize=sequelize;