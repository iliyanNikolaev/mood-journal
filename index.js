const express = require('express');

const {configExpress} = require('./config/express');

const app = express();

start();

async function start() {
    configExpress(app);

    app.listen(3000, () => console.log('server is started on port 3000'));
}
