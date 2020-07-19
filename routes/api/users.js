const express = require('express')
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('./../../models/User');
const Group = require('../../models/Group');
const auth = require('../../middleware/auth');
var mongoose = require('mongoose');


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

//@GET /api/users
//desc return all users
//@access private
router.get('/',auth,async(req,res)=>{
    try {
        const users = await User.find().sort({date:-1})
        if(!users){
            return res.status(404).json({msg:'No User Found'})
        }
        res.json(users)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

//@ROUTE      GET '/api/users/groups'
//@DESC       get all groups of a user/
//@acceess    PRIVATE
router.get('/groups',auth,async(req,res)=>{
    try {
       const user = await User.findById(req.user.id);
       const groupIds = user.groups.map(group=>mongoose.Types.ObjectId(group._id));
       const groups = await Group.find({_id:{$in:groupIds}});
       res.json(groups); 
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;