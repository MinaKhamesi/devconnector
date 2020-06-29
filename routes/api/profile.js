const express = require('express');
const {body,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('./../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

//@GET     /api/profile/me
//desc     get current users's profile
//@access  private
router.get('/me',auth,async (req,res)=> {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])

        if(!profile){
            return res.status(400).json({msg:'no profile found for this user!'})
        }

        res.json(profile)
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

//@route      POST /api/profile
//@desc      create and edit profile
//@access    private
router.post('/',[auth,[
    body('status','status is requires').notEmpty(),
    body('skills','skills are required').notEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    const {status,skills,location,website,company,bio,githubusername,youtube,facebook,linkedin,twitter,instagram} = req.body
    const userId = req.user.id
    
    //check if optional fields exist and add them to an object
    const profileField = {}

    profileField.user = userId;
    if(company) profileField.company = company;
    if(status) profileField.status = status;
    if(location) profileField.location = location;
    if(website) profileField.website = website;
    if(company) profileField.company = company;
    if(githubusername) profileField.githubusername = githubusername;
    if(bio) profileField.bio = bio;

    if (skills) profileField.skills = skills.split(',').map(skill=>skill.trim())
    
    //build social object
    profileField.social = {}
    if (twitter) profileField.social.twitter = twitter;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (facebook) profileField.social.facebook = facebook;
    if (instagram) profileField.social.instagram = instagram;
    if (youtube) profileField.social.youtube = youtube;
    
    try {
        let profile = await Profile.findOne({user:userId});
        
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate(
                {user:userId},
                {$set:profileField},
                {new:true}
            );
            return res.json(profile)
        }
        
        //Create???
        profile =  new Profile(profileField);

        await profile.save();
        
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error!')
    }
})


//@route    GET /api/profile
//@desc     get all profiles
//@access   public
router.get('/',async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message)
        res.status(500).json('server Error')
    }
})

//@route    GET /api/profile/user/:user-id
//@desc     get a profile by user-id
//@access   public
router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

        if(!profile) return res.status(400).json({msg:'Profile Not Found'})
        res.json(profile);
    } catch (err) {
        console.log(err.message)
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:'Profile Not Found'})
        }
        res.status(500).json('server Error')
    }
})




module.exports = router;