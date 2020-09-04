var express = require('express');
var router = express.Router();

var formModel = require('../models/formModel');

router.post('/listPage', function (req, res) {
    var reg = new RegExp(req.body.keyword, 'i'),
        pageSize = req.body.pageSize,
        current = req.body.current,
        skip = (current - 1) * pageSize;
    formModel.countDocuments({title: reg}, function (cErr, count) {
        if(!cErr) {
            formModel.find({title: reg}, {}, {skip: skip, limit: pageSize, sort: {'updateDate': -1}}, function (err, result) {
                if (err) {
                    res.json({
                        code: '500',
                        message: '服务器异常',
                        content: null
                    });
                } else {
                    res.json({
                        code: '200',
                        message: '请求成功',
                        content: {
                            data: result,
                            total: count
                        }
                    });
                }
            });
        }
    });
});
router.post('/add', function (req, res) {
    var data = req.body;
    formModel.create(data, function (err, data) {
        if (err) {
            res.json({
                code: '500',
                message: '服务器异常',
                content: null
            });
        } else {
            res.json({
                code: '200',
                message: '请求成功',
                content: {}
            });
        }
    });
});
router.post('/update', function (req, res) {
    var data = req.body;
    data.updateDate = new Date();
    formModel.update({_id: data._id},data, function (err, data) {
        if (err) {
            res.json({
                code: '500',
                message: '服务器异常',
                content: null
            });
        } else {
            res.json({
                code: '200',
                message: '请求成功',
                content: {}
            });
        }
    });
});
router.post('/detail', function (req, res) {
    var id = req.body._id;
    formModel.findOne({_id: id}, function (err, data) {
        if (err || !data) {
            res.json({
                code: '500',
                message: '服务器异常',
                content: null
            });
        } else {
            res.json({
                code: '200',
                message: '请求成功',
                content: data
            });
        }
    });
});
router.post('/delete', function (req, res) {
    formModel.findOne({_id: req.body._id}, function (err, data) {
        if(err || !data) {
            res.json({
                code: '500',
                message: '记录不存在',
                content: null
            })
        }else {
            formModel.deleteOne({_id: req.body._id}, function (err1, data1) {
                if (err1) {
                    res.json({
                        code: '500',
                        message: '服务器异常',
                        content: null
                    });
                } else {
                    res.json({
                        code: '200',
                        message: '请求成功',
                        content: {}
                    });
                }
            });
        }
    });
});
module.exports = router;