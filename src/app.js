//1st step, declare and get your libraries.
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose')

//create an object from EXPRESS
const app= express();

//Connection to DB.
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db=>console.log('DB Connected'))
    .catch(err=>console.log(err))

//importing routes (previously defined at "index.js" as an exportable module)
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT||3000);
app.set('views',path.join(__dirname,'views')); //Views
app.set('view engine', 'ejs');

//middlewares (Funcion que se ejecuta antes de las rutas)
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server running on port ${app.get('port')}`);
});