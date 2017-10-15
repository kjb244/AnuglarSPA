'use strict';

var express = require('express');
var router = express.Router();
var routes = require('../copy/routes.json');
var path = require('path');
var db = require('diskdb');

db = db.connect(path.join(__dirname, '..','database'), ['userinfo', 'addressinfo', 'militaryinfo']);

function delayResponse(res, obj){
    setTimeout(()=> { res.send(JSON.stringify(obj)) }, 500);
}

//GETS
router.get('/', function(req, res, next) {
  res.render('index');

});

router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

router.get('/directive_templates/:name', function (req, res) {
  var name = req.params.name;
  res.sendFile(path.join(__dirname, '../', 'views', 'directive_templates', name));
});


router.get('/getRoutes', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(routes));
});

router.get('/getUserInfo', function(req, res){

    let infoArr = db.userinfo.find();
    delayResponse(res, infoArr);

});


router.get('/getAddressInfo', function(req, res){
    let infoArr = db.addressinfo.find();
    delayResponse(res, infoArr);

});

router.get('/getMilitaryInfo', function(req, res){
    let infoArr = db.militaryinfo.find();
    delayResponse(res, infoArr);

});


//POSTS
router.post('/postUserInfo', function(req, res) {
    let data = req.body.data;

    let infoArr = db.userinfo.find();
    if (infoArr.length){
        db.userinfo.remove(infoArr[0], true);
    }

	db.userinfo.save(data);

    let obj = { isValid: true, nextRoute: 'second', prevRoute: 'first' };

    res.send(JSON.stringify(obj));
});

router.post('/postAddressInfo', function(req, res) {
    let data = req.body.data;
    let infoArr = db.addressinfo.find();
    if (infoArr.length){
        db.addressinfo.remove(infoArr[0], true);
    }

    db.addressinfo.save(data);


    let obj = { isValid: true, nextRoute: 'third', prevRoute: 'default' };

    res.send(JSON.stringify(obj));
});

router.post('/postMilitaryInfo', function(req, res) {
    let data = req.body.data;
    let infoArr = db.militaryinfo.find();
    if (infoArr.length){
        db.militaryinfo.remove(infoArr[0], true);
    }

    db.militaryinfo.save(data);


    let obj = { isValid: true, nextRoute: false, prevRoute: 'second' };

    res.send(JSON.stringify(obj));
});








module.exports = router;
