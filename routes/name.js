var express = require('express');
var router = express.Router();

var nameModel = require('../models/nameModel');

router.post('/list', function (req, res) {
    nameModel.find({}, {}, {sort: {'updateDate': -1}}, function (err, result) {
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
                content: result
            });
        }
    });
});
router.post('/listPage', function (req, res) {
    var reg = new RegExp(req.body.keyword, 'i'),
        pageSize = req.body.pageSize,
        current = req.body.current,
        skip = (current - 1) * pageSize;
    nameModel.countDocuments({$or: [{key: reg}, {value: reg}]}, function (cErr, count) {
        if(!cErr) {
            nameModel.find({$or: [{key: reg}, {value: reg}]}, {}, {
                skip: skip,
                limit: pageSize,
                sort: {'updateDate': -1}
            }, function (err, result) {
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
    nameModel.find({
        $or: [{key: req.body.key}, {value: req.body.value}]
    }, function (err, data) {
        if (err) {
            res.json({
                code: '500',
                message: '服务器异常',
                content: null
            });
        } else {
            if (data.length > 0) {
                res.json({
                    code: '500',
                    message: '变量已存在',
                    content: null
                });
            } else {
                req.body.key = req.body.key.replace(/ /g, '');
                req.body.value = req.body.value.replace(/ /g, '');
                nameModel.create(req.body, function (err1) {
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
        }
    });
});
router.post('/update', function (req, res) {
    req.body.key = req.body.key.replace(/ /g, '');
    req.body.value = req.body.value.replace(/ /g, '');
    nameModel.find({
        _id: {$ne: req.body._id},
        $or: [{key: req.body.key}, {value: req.body.value}]
    }, function (err, data) {
        if (err) {
            res.json({
                code: '500',
                message: '服务器异常',
                content: null
            });
        } else {
            if (data.length > 0) {
                res.json({
                    code: '500',
                    message: '变量已存在',
                    content: null
                });
            } else {
                nameModel.update({_id: req.body._id},
                    {$set: {key: req.body.key, value: req.body.value, updateDate: new Date()}},
                    function (err1) {
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
        }
    });
});
router.post('/delete', function (req, res) {
    nameModel.findOne({_id: req.body._id}, function (err, data) {
        if (err || !data) {
            res.json({
                code: '500',
                message: '记录不存在',
                content: null
            })
        } else {
            nameModel.deleteOne({_id: req.body._id}, function (err1, data1) {
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