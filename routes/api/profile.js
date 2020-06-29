const express = require('express')

const router = express.Router();

//@GET     /api/profile
//desc     test
//@access  public
router.get('/',(req,res)=> res.send('profile route'))


module.exports = router;