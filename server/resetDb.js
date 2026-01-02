const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const schemaPath = path.join(__dirname, '../database/schema.sql');

async function resetDatabase() {
    try {
        console.log('Reading schema file...');
        const sql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Connecting to database server...');
        // Connect without database selected to allow CREATE DATABASE
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: parseInt(process.env.DB_PORT || '3306'),
            multipleStatements: true
        });

        console.log('Executing schema...');
        await connection.query(sql);

        console.log('Database reset successfully!');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();
