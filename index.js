const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const router = require('./routers/index');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/', router);

app.listen(5000, function(){
    console.log("Servidor rodando ...");
});