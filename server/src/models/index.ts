import { Sequelize } from 'sequelize';
import { $db } from '../config';

const { host, database, username, password } = $db;
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
});

const models = {
    User: require('./User').default(sequelize, Sequelize),
    Product: require('./Product').default(sequelize, Sequelize),
    sequelize,
};

export default models;
