//Public Health Unit

const express = require('express');
const PublicHealthUnitController = require('../controller/PublicHealthUnit');
const router = express.Router();

router.get('/', PublicHealthUnitController.publicHealthUnits_get_all);
router.get("/:publicHealthUnitId", PublicHealthUnitController.publicHealthUnit_get_by_id);
  
module.exports = router;