//Public Health Unit

const express = require('express');
const PublicHealthUnitController = require('../controller/PublicHealthUnit');
const router = express.Router();

router.get('/', PublicHealthUnitController.publicHealthUnits_get_all);
  
module.exports = router;