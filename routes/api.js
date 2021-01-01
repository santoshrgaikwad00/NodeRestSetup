const express = require('express')
const api = require('./../controller/apiController')
const router = express.Router();

router.post('/insert', api.insert);
router.get('/getinsert/:type/:data', api.getinsert);
module.exports = router;