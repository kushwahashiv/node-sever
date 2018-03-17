const Sequelize = require('sequelize');

const initializeDb = () => {
    // Create connection - No username password for now
    const con = new Sequelize('', '', '', {
       dialect: 'sqlite',
       storage: 'maker_sight.sqlite',
    });
    // Connect to Database
    // Instantiate models
    // Sync database with models
};

export default initializeDb;