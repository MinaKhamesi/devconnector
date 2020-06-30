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

//route     DELETE '/api/profile'
//@desc     delete profile, user & posts
//@acces    private
router.delete('/',auth,async(req,res)=>{
    try {
        //@todo remove posts

        //remove profile
        await Profile.findOneAndDelete({user:req.user.id});

        //remove user
        await User.findByIdAndDelete(req.user.id);
        res.json({msg:'User Removed'});
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})


//@route      PUT /api/profile/experience
//@desc      Add experience
//@access    private
router.put('/experience',[auth,[
    body('company','company name is requires').notEmpty(),
    body('title','title is required').notEmpty(),
    body('from','start date is required').notEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    const {company,title,from,to,current,location,description} = req.body
    const userId = req.user.id
    
    //check if optional fields exist and add them to an object
    const ExperienceField = {}

    if(company) ExperienceField.company = company;
    if(title) ExperienceField.title = title;
    if(from) ExperienceField.from = from;
    if(to) ExperienceField.to = to;
    if(current) ExperienceField.current = current;
    if(location) ExperienceField.location = location;
    if(description) ExperienceField.description = description;
    
    
    try {
        let profile = await Profile.findOne({user:userId});
        
        if(!profile) return res.status(401).json({msg:'Profile not found'})
     

        profile.experience.unshift(ExperienceField);
        await profile.save();
        res.json(profile)

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error!')
    }
})


//route    DELETE /api/profile/experience/:exp-id
//desc     delete an experience
//access   private
router.delete('/experience/:exp_id',auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const idxToRemove = profile.experience.map(exp=>exp.id).indexOf(req.params.exp_id);
        profile.experience.splice(idxToRemove,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})


//@route      PUT /api/profile/education
//@desc      Add education
//@access    private
router.put('/education',[auth,[
    body('school','School name is requires').notEmpty(),
    body('fieldofstudy','Field of study is required').notEmpty(),
    body('from','Start date is required').notEmpty(),
    body('degree','Degree is required').notEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    const {school,fieldofstudy,from,to,current,degree,description} = req.body
    const userId = req.user.id
    
    //check if optional fields exist and add them to an object
    const educationField = {}

    if(school) educationField.school = school;
    if(fieldofstudy) educationField.fieldofstudy = fieldofstudy;
    if(from) educationField.from = from;
    if(to) educationField.to = to;
    if(current) educationField.current = current;
    if(degree) educationField.degree = degree;
    if(description) educationField.description = description;
    
    
    try {
        let profile = await Profile.findOne({user:userId});
        
        if(!profile) return res.status(401).json({msg:'Profile not found'})
     

        profile.education.unshift(educationField);
        await profile.save();
        
        res.json(profile)

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error!')
    }
})


//route    DELETE /api/profile/education/:edu-id
//desc     delete an education
//access   private
router.delete('/education/:edu_id',auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const idxToRemove = profile.education.map(edu=>edu.id).indexOf(req.params.edu_id);
        profile.education.splice(idxToRemove,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})



module.exports = router;