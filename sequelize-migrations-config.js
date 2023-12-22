module.exports = function() {
  var sequelizeParams = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  };

  return {
    development: sequelizeParams,
    test: sequelizeParams,
    production: sequelizeParams
  };
};
