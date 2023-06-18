const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../pages.db');
const fs = require('fs');

const sql = fs.readFileSync('db_create.sql').toString();

db.exec(sql, function(err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Tables created successfully.');
    }
});
db.close()