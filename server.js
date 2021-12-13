var getPlans = require('./daos/PlansDao.js');
var getDoctors = require('./daos/DoctorDao.js');
var getDoctorsByPlanId = require('./daos/DoctorsByPlanDao.js');
var getDoctorsTime = require('./daos/GetDoctorTimeDao.js');

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 8080;
app.use(express.json()); // for parsing application/json
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

app.get('/plans', (req, res) => {
    getPlans.getPlansFunction(res);
});

app.get('/doctors', (req, res) => {
    getDoctors.getDoctorsFunction(res);
});

app.get('/doctors-by-plan-id', (req, res) => {
    let planId = req.query.planId;
    getDoctorsByPlanId.getDoctorsByPlanIdFunction(res, planId);
});

app.get('/doctors-time-by-planId-and-doctorId', (req, res) => {
    let criterias = {
        planId: req.query.planId,
        doctorId: req.query.doctorId
    };
    getDoctorsTime.getDoctorTimeByPlanIdAndDoctorIdFunction(res, criterias);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})