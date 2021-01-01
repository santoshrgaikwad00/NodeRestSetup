const config = {}
const fs = require('fs')

/**
 * Store PID of Process
 * Used for Log Rotation to receive USR2 signal from logrotate service so we can reopen log files 
 */
fs.writeFileSync('app.pid', process.pid)


/**
 * Initialize App with Global Configuration
 */
config.init = ( app  ) => { 
    global.PORT = 7000;
    app.set('env' , 'production');
    global.apiKey = true;
    global.keySet = { "sfnk83hrworwhf48wfuefh3" : { "added" : "2019-06-07" , "status" : 1 } , "sdifho48oo83yrhwdpqsf" : { "added" : "2019-06-07" , "status" : 0 } , "zjk4e78o3wd83yohdqd" : { "added" : "2019-06-20" , "status" : 1 } }
    global.logWrite = false;
    global.FileWritePath = 'data/';
    global.accessLog = false;
    global.errorLog = true;
}


/**
 * API Key Authentication Middleware
 */
config.apiAuth = ( req , res , next ) => {
    try {
        
        if( ! global.apiKey.enabled ) next()

        if( global.apiKey.enabled ) {
            if( req.query.key in  global.keySet && global.keySet[req.query.key]['status'] == 1 ) {
                next()
            } 
            else{
                next({success: false , code: "Access Denied" , message:"[ apiAuth ] Invalid / Expired API Key"})
            }
        }
    } catch( error ) {
        next({success: false , code: "Access Denied" , message:`[ apiAuth ] ${error.message}`})
    }
}


/**
 * Logger Middleware.
 * Uses Pino Logger Extreme Mode For Logging into file
 */
config.Logger = ( req , res , next )=>{
    next()
}


/**
 * Error Handler : This will called when we report error with next funtion
 * Logs error to error log file using Pino
 */
config.ErrorHandler = ( err , req , res , next )=>{
    res.status(500).send( { success: false , error : err.code , message : err.message });
}


/**
 * 404 Error Handler : Reirected to this when no route found in app for request
 */
config.ErrorHandler404 = ( req , res , next )=>{
    res.send( {success: false , error :"404 : Page Not Found" , url : req.url});
}

module.exports = config