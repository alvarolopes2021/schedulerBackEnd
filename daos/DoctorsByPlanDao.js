var db = require('../connection/connection.js')

var mysql = require('mysql');

async function getDoctorsByPlanId(res, planId) {
    var connection = mysql.createConnection({
        host: db.db.HOST,
        user: db.db.USER,
        password: db.db.PSW,
        database: db.db.DB
    });

    connection.connect();

    connection.query('SELECT * FROM doctorsbyplan dbp INNER JOIN doctors d ON dbp.doctorId=d.doctorId INNER JOIN plans p ON dbp.planId=p.planId WHERE dbp.planId = ?', planId, function(err, rows, fields) {
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

exports.getDoctorsByPlanIdFunction = async function getDoctorsByPlanIdFunction(res, planId) {
    return await getDoctorsByPlanId(res, planId);
}