const apiModel = {}
/* 
* Insert into database
*/
apiModel.InsertData = async ( req, res ) =>{
	console.log('req.body.type ==>> ', req.body.type);
	console.log('req.body.data ==>> ', req.body.data);
	let doc = {"in" : "Modal response 1212 ", "req-type" : req.body.type, "req-data" : req.body.data };
	return res.status(201).json({status: 'success', data: {...doc}});
}

apiModel.getInsertData = async ( req, res ) => {
	console.log('req.params.type ==>> ', req.params.type);
	console.log('req.params.data ==>> ', req.params.data);
	let doc = {"in" : "getInsertData Modal", "req-type" : req.params.type, "req-data" : req.params.data };
	return res.status(201).json({status: 'success', data: {...doc}});
}

module.exports = apiModel