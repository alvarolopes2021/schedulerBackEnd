var db = require('../connection/connection.js')

var mysql = require('mysql');

async function getPlans(res) {
    var connection = mysql.createConnection({
        host: db.db.HOST,
        user: db.db.USER,
        password: db.db.PSW,
        database: db.db.DB
    });

    connection.connect();

    connection.query('SELECT * FROM plans', function(err, rows, fields) {
        var objects = [];
        if (err) {
            return err;
        }
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i])
            objects.push(rows[i]);
        }
        res.json(objects);
    });

    connection.end();

}

exports.getPlansFunction = async function getPlansFunction(res) {
    return await getPlans(res);
}