var db = require('../connection/connection.js')

var mysql = require('mysql');

async function getDoctorTimeByPlanIdAndDoctorId(res, criterias) {
    var connection = mysql.createConnection({
        host: db.db.HOST,
        user: db.db.USER,
        password: db.db.PSW,
        database: db.db.DB
    });

    connection.connect();

    connection.query('SELECT dt.doctorsTimeId, d.doctorName, d.doctorExperience, p.planProvider, p.planType, dt.doctorTime FROM doctorstime dt INNER JOIN doctors d on d.doctorId = dt.doctorId INNER JOIN plans p on p.planId = dt.planId WHERE dt.doctorId = ? AND dt.planId= ? ', [criterias.planId, criterias.doctorId], function(err, rows, fields) {
        var objects = [];
        if (err) {
            res.json(err);
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


exports.getDoctorTimeByPlanIdAndDoctorIdFunction = async function getDoctorTimeByPlanIdAndDoctorIdFunction(res, criterias) {
    return await getDoctorTimeByPlanIdAndDoctorId(res, criterias);
}