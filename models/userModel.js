const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var userSchema  = new Schema({
    name: String,
    age: {type: Number, default: 18}
});

var user = mongoose.model('user', userSchema, 'userCollection');

function save(params) {
    var entity = new user({name: params.name, age: params.age});
    entity.save(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Save Ok!');
        }
    });
};

module.exports = user;