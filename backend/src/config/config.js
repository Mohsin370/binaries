require("dotenv").config({ path: __dirname+'/../../.env' });
const sequelizeConfig = {
    development: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres'
    },
    test: {
      username: 'root',
      password: null,
      database: 'binaries',
      host: 'localhost',
      dialect: 'postgres'
    },
    production: {
      username: 'root',
      password: null,
      database: 'binaries',
      host: 'localhost',
      dialect: 'postgres'
    },
    docker: {
      username: 'postgres',
      password: 'admin',
      database: 'binaries',
      host: 'localhost',
      dialect: 'postgres'
    }
  };
  
  module.exports = sequelizeConfig;
  