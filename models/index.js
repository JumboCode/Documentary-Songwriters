const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Client } = require('pg');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const defaultURI = 'postgres://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/postgres';
let db = {};

// create database using pg (sequelize sync creates tables)
module.exports.init = (cb) => {
  const client = new Client({ connectionString: defaultURI });
  client.connect((err) => {
    if (err) throw err;
  });

  client.query('CREATE DATABASE ' + config.database, (err, res) => {
    client.end();
    

    let sequelize;
    // TODO change config setup for custom use (DONT STORE PASSWORD IN PLAIN TEXT IN PROD - config.js)
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
      });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    cb(db);
  });
};

module.exports.createUser = (firstName, lastName, username, email) => {
  return db.User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email
  });
};

module.exports.getUser = (username) => {
  return db.User.findByPk(username);
};

module.exports.changeEmail = (username, email) => {
  return db.User.update({
    email: email
  }, {
    where: {username: username},
    returning: true,
    plain: true
  });
};

module.exports.changeUsername = (old_username, new_username) => {
  return db.User.update({
    username: new_username
  }, {
    where: {username: old_username},
    returning: true,
    plain: true
  });
};


