
const user = require('./user');
const form = require('./form');
const name = require('./name');

module.exports = function (app) {
    // app.use('/user', user);
    app.use('/form', form);
    app.use('/name', name);
};
