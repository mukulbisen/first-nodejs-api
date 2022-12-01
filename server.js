var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');
const vehicle = require('./app/models/vehicle');

/*
Configure app for bodyParser()
lets us grab data from the body of POST
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up port for sever to listen on
var port = process.env.PORT || 3000;

// connect to DB
mongoose.connect('mongodb://localhost:27017/codealong');

//API Routes
var router = express.Router();

//Routes will all be prefixed with/api
app.use('/api', router);

//MIDDLEWARE -
//MIDDLEWARE CAN BE VERY USEFUL FOR DOING VALIDATIONS . WE CAN LOG
//THINGS FROM HERE OR STOP THE REQUEST FROM CONTINUING IN THE EVENT
//THAT THE REQUEST IS NOT SAFE.
//MIDDLEWARE TO USE FOR ALL REQUESTS.
router.use(function(req, res, next) {
    console.log('FYI... there is some processing currently going down...');
    next();
});

//test route
router.get('/', function(req, res) {
    res.json({message: 'Welcome to mukuls API!'});
});

router.route('/vehicles')

    .post(function(req, res){
        var vehicle = new Vehicle(); //new instance of a vehcile
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;

        vehicle.save(function(err){
            if (err) {
                res.send(err);
            }
            res.json({message: 'Vehicle was successfully manufactured'});
        });
    })

    .get(function(req, res){
        vehicle.find(function(err, vehicles){
            if (err) {
                res.send(err);
            }
            res.json(vehicles);
        });
    });

router.route('/vehicle/:vehicle_id')
    .get(function(req, res){
        Vehicle. findById(req.params.vehicle_id, function(err, vehicle){
            if (err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });
    
router.route('/vehicle/make/:make')
    .get(function(req, res){
        vehicle. find({make:req.params.make}, function(err, vehicle){
            if (err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });    

router.route('/vehicle/color/:color')
    .get(function(req, res){
        vehicle. find({color:req.params.color}, function(err, vehicle){
            if (err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });    

// fire up server
app.listen(port);
//print friendly message to console
console.log('Server listening on port'+port);