var express = require('express');
var router = express.Router();

var userModel = require('../models/userModel');

/* GET users listing. */
router.get('/info', function (req, res, next) {
    userModel.create({name: '李四', age: 21}, function (err, data) {
        console.log(arguments);
        userModel.find({name: '李四'},{name: 0},{}, function (err1, result) {
            console.log(result);
            userModel.remove({_id: '5b726e338059cebff9f68c4f'}, function (err) {
                console.log('delete success');
            })
        });
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    userModel.findOne({name: '李四'},{name: 1},{}, function (err, result) {
        if(err) {
            res.json({
                code: '500',
                message: '服务器异常',
                content: null
            });
        }else {
            res.json({
                code: '200',
                message: '登录成功',
                content: result
            });
        }
    });
});

module.exports = router;
