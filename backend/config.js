const dotenv = require('dotenv');
const path = require('path');

// Elimina espacios extra en NODE_ENV y usa el archivo correspondiente
const envFile = `${(process.env.NODE_ENV || 'development').trim()}.env`;

dotenv.config({
    path: path.resolve(__dirname, envFile)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'selineweb',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'areasRoles'

};