const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Michelle!0326",
    host: "localhost",
    port: 5432,
    database: "jobopportunities"
});

module.exports = pool;