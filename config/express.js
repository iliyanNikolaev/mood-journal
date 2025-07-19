const express = require('express');
const path = require('path');

function configExpress(app){
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    });
}

module.exports = {
    configExpress
}