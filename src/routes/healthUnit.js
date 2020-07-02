//Public Health Unit

const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send("Messaged Received")
  });
  
module.exports = router;