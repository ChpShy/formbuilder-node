const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var formSchema  = new Schema({
    title: String,
    projectFormId: Number,
    img: String,
    dataStyle: Object,
    html: String,
    createDate: {type: Date, default: new Date()},
    updateDate: {type: Date, default: new Date()},
});

var form = mongoose.model('form', formSchema, 'formCollection');

module.exports = form;