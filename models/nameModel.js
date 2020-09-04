const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var nameSchema  = new Schema({
    key: String,
    value: String,
    createDate: {type: Date, default: new Date()},
    updateDate: {type: Date, default: new Date()},
});

var name = mongoose.model('name', nameSchema, 'nameCollection');

module.exports = name;