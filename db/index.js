const { Pool } = require("pg");

const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const proConfig = process.env.DATABASE_URL; 

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
    // ssl: {    
    //   require: true,
    //   rejectUnauthorized: false,
    // },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
