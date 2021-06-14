import config from 'config';
import Sequelize from 'sequelize';

import UserModel from '@models/user.model';
import shortUrlModel from '@/models/short-url.model';

import { dbConfig } from '@interfaces/db.interface';

const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');

const sequelize = new Sequelize.Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    timezone: '+09:00',
    pool: {
        min: pool.min,
        max: pool.max
    },
    logQueryParameters: process.env.NODE_ENV === 'development',
    logging: (query, time) => {
        console.info(time + 'ms' + ' ' + query);
    },
    benchmark: true
});

sequelize.authenticate();

const DB = {
    Users: UserModel(sequelize),
    ShortURL: shortUrlModel(sequelize),
    sequelize,
    Sequelize
}

export default DB;