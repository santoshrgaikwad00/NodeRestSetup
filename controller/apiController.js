const apiModel = require("../models/apiModel")
const apiController = {}

/* 
* Add Task To Celery For processing 
*/
apiController.insert = async (req , res, next) => {    
    try {        
        apiModel.InsertData(req, res);
    } 
    catch ( error ) { 
        next( error ) 
    }
}

apiController.getinsert = async (req, res, next) => {
    try { 
        apiModel.getInsertData(req, res);
    }
    catch ( error ) { 
        next( error ) 
    }
}

module.exports = apiController;