const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme_backend_db');
const express = require('express')
const app = express()


const setup = async()=>{
    await client.connect()
    console.log('connected')
    const SQL = `
    DROP TABLE IF EXISTS things;
    CREATE TABLE things(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
    )
    INSERT INTO things (name) VALUES ('foo')
    INSERT INTO things (name) VALUES ('bar')
    INSERT INTO things (name) VALUES ('bazz')
    `
    await client.query(SQL)
    console.log('seeded')
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{
        console.log(`i hear you on port ${port}`)
    })
}

setup()