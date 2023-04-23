const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'expense-tracker',
    'root',
    'earth4800',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = sequelize;