const express = require('express');
const {body,validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('./../../middleware/auth');
const User = require('./../../models/User');

const router = express.Router();

//@GET     /api/auth
//desc     test
//@access  public
router.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg:'Server Error'})
    }
} )


//#2
//@POST     /api/auth
//desc     log in a user
//@access  public
router.post('/',[
    body('email','please enter a valid email').isEmail(),
    body('password','password is required!').exists(),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    const {email,password} = req.body
    
    try {

        //#1 see if user doesnt exist

        let user = await User.findOne({email})
        if (!user){
            return res.status(400).json({errors:[{msg:'Invalid credentials!'}]})
        }
    //#3  see if password matches the user password

    const passwordsMatch = await bcrypt.compare(password,user.password)

    if (!passwordsMatch){
        return res.status(401).json({errors:[{msg:'Invalid Credentials'}]})
    }

    //#4 grant json web token
    
    const payload = {user:{id:user.id}}
    const token = await jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000});

    res.json({token});
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    } 
})



module.exports = router;