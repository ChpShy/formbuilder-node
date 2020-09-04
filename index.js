const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const history = require('connect-history-api-fallback');
const db = require('./mongodb/db');
const router = require('./routes/index');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();
});

router(app);

app.use(history());
app.listen(3000, function () {
    console.log('Listening on：' + 'http://localhost:3000 ')
});