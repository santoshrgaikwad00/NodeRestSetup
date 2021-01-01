const express = require('express');
const configuration = require('./config');
const app = express();
const bodyParser = require('body-parser');

/* Application url parseing */ 
app.use(express.urlencoded({ extended: false }));
app.set('etag', false)


/* Initialize Configuration , Looger and Api Authentication*/
configuration.init(app);
app.use(configuration.Logger);
app.use(bodyParser.json());

// app.use(configuration.apiAuth); santosh

/**
 * Reload Configuration
 * Use this route to update configuration 
 */
app.get('/reloadConfiguration' , (req , res) =>{
    configuration.init(app);
    res.send({success : true , message : "Configuration Reloaded"});
})

/***===========================================================
*** npm install
*** node app.js
***	
*** DEMO API CALLS......... 
*** IN THIS RESTAPI SETUP..
***

 http://localhost:7000/api/getinsert/1111111111111/22222222222

 http://localhost:7000/api/insert     	
 POSTDATA = { "type" : "type 11 22 33", "data" : "data 44 55 66" }

 ***
 ***
 ***
 ***
 ***
 **==========================================================*/
/* Import Routing */
app.use('/api', require('./routes/api'));

/*Error Handling*/
app.use(configuration.ErrorHandler404);
app.use(configuration.ErrorHandler);

/* Initialize HTTP Server */
var http = require('http').Server(app);
var server = http.listen( global.PORT , () => {
    console.log(`[ RedirectionLogApi ] API Server Started ( Port : ${server.address().port} )`);
});

