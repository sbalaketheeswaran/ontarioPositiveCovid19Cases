//Public Health Unit

const express = require('express');
const OntarioMetaCovidCaseController = require('../controller/OntarioMetaCovidCase');
const router = express.Router();

router.get('/', OntarioMetaCovidCaseController.ontarioMetaCovidCase_get);
  
module.exports = router;