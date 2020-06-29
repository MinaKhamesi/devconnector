const express = require('express')
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('./../../models/User');


//@POST     /api/users/
//desc     register a new user
//@access  public
router.post('/',[
    body('name','name is required').notEmpty(),
    body('email','email is required').notEmpty(),
    body('email','please enter a valid email').isEmail(),
    body('password','please enter a password with 6 or more charachters').isLength({min:6}),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    const {name,email,password} = req.body
    
    try {
        //#1 see if user already exist
        let user = await User.findOne({email})
        if (user){
            return res.status(400).json({errors:[{msg:'User already exists. '}]})
        }
        //#2 get gravatar

        const avatar = gravatar.url(email,{s:'200',r:'pg',default:'mm'});
        user = new User({
            name,
            email,
            avatar,
            password
        })
    //#3 hash password and create the new user
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)

    await user.save();
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