module.exports.mysqlenv = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
};

module.exports.mysql = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'wordguessr'
};