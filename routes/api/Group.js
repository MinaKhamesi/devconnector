const router = require('express').Router();
const Group = require('../../models/Group');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const { json } = require('express');



//@ROUTE       POST '/api/groups'
//@DESC        create a new group
//@access      PRIVATE
router.post('/',[auth,[
    body('name','Name of the group is Required.').not().isEmpty(),
    body('name','Please Select a shorter name.').isLength({max:40}),
    body('description','Description of the group is required').not().isEmpty(),
    body('description','Description should not be more than 200 charachters.').isLength({max:200})
]],async (req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
try {
    
    const adminData = await User.findById(req.user.id);
    const {name,description,public} = req.body;
    const newGroupData ={
        name,description,public,
        admin:req.user.id,
        admin_name : adminData.name,
        admin_avatar:adminData.avatar}

    newGroupData.members = req.body.members ? [req.user.id,...req.body.members.split(',').map(id=>id.trim())]:[req.user.id]
    
    const newGroup = await new Group(newGroupData);
    await newGroup.save()

    newGroup.members.forEach(async (memberId)=>{
            const member = await User.findById(memberId);
            member.groups.unshift(newGroup._id);
            await member.save();
        })
    
    res.json(newGroup);
} catch (err) {
    console.log(err)
    res.status(500).send('Server Error')
}

})


//@ROUTE       GET '/api/groups/'
//@DESC        get all groups
//@access      PRIVATE
router.get('/',auth,async(req,res)=>{
    try {
        const groups = await Group.find();
        if(!groups){
            return res.status(404).json({msg:'No Group Found.'})
        }
        res.json(groups);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//@ROUTE       GET '/api/groups/:group_id'
//@DESC        get a group by id
//@access      PRIVATE
router.get('/:id',auth,async(req,res)=>{
    try {
        const group = await Group.findById(req.params.id);
        if(!group){
            return res.status(404).json({msg:'Group Not Found'})
        }
        res.json(group);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})



//@ROUTE      PUT '/api/groups/:group_id/addmembersbyemail RETURn members
//@DESC       add members by email(if group is private only by admin)
//@access     Private
router.put('/addmembersbyemail/:id',[auth,[
    body('emails','No email Is Selected').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
      const emailList = req.body.emails.split(',').map(email=>email.trim());
      const group = await Group.findById(req.params.id);
      if(!group){
          return res.status(404).json({msg:'Group Not Found.'})
      }

      if( !group.public && group.admin != req.user.id ){
          return res.status(401).json({msg:'Not Authorized. only admin can add members to private groups.'})
      }


      emailList.forEach(async(email)=>{
          try {
              const user = await User.findOne({email});
              if(!user){
                  return res.status(401).json({msg:'User Not Found.'})
              }

              isAlreadyInGroup = user.groups.filter(group=>group._id==req.params.id).length!=0 || group.members.indexOf(user._id)!=-1

              if(!isAlreadyInGroup){
                  user.groups.unshift({_id:req.params.id});
                  group.members.unshift(user._id);
                  await user.save()
              }
        
          } catch (err) {
              console.log(err.message)
              return res.status(500).send('Server Error')
          }
      })


    await group.save();
    res.json(group.members)
      
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error')
  }
})

//@ROUTE       PUT '/api/groups/:group_id/addmembers'/ RETURN group.member
//@DESC        add a member or a list of members(only by admin if group is private)
//@access      PRIVATE
router.put('/:id/addmembers',[auth,[
    body('members','No member is Selected').not().isEmpty(),
]],async(req,res)=>{
    console.log(req.body)
    console.log('we ar in add member endpoint');
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
      const group = await Group.findById(req.params.id);
      if(!group){
          return res.status(404).json({errors:[{msg:'Group Not Found'}]})
      }
      //check if the group is private user should be admin
      
      if(!group.public && req.user.id!=group.admin ){
            return res.status(401).json({errors:[{msg:'Not Authorized.Only Admin can Add members in private groups.'}]})
      }
 
      const newMembersList = req.body.members.split(',').map(id=>id.trim())

      //check if any of the members is already in group
      
        const membersList = newMembersList.filter(idx=>group.members.indexOf(idx)===-1);

        //check if any of the members is in groups blockList
        membersList.forEach(id=>{
            if(group.blockList.indexOf(id)!==-1){
                return res.status(401).json({errors:[{msg:'At least one of selected users is blocked from the group.First unblock users.'}]})
            }
        })

        //add members to group
        group.members.unshift(...membersList)

        //add groupId to every member group
        membersList.forEach(async(id)=>{
            const member = await User.findById(id);
            member.groups.unshift(req.params.id)
            await member.save()
        })
        
        await group.save()
        res.json(group.members)
      
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error')
  }
})



//@ROUTE       DELETE '/api/groups/:group_id/deletemembers'/ RETURN group.member
//@DESC        delete a member or a list of members(only by admin)
//@access      PRIVATE
router.put('/deletemembers/:group_id',[auth,[
    body('users','No Member Is Selected').not().isEmpty(),
]],async(req,res)=>{
    console.log(req.body)
    console.log('we are here in correct endpoint.delete')
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    try {
        const group = await Group.findById(req.params.group_id);
        if(!group){
            return res.status(404).json({errors:[{msg:'Group Not Found'}]})
        }
        
        if(req.user.id!=group.admin){
            return res.status(401).json({errors:[{msg:'Not Authorized.Only Admin can remove members'}]})
        }

        //convert string to list
        const memberList = req.body.users.split(',').map(id=>id.trim());
        //check if all are actually members
        const membersToRemove = memberList.filter(id=>group.members.indexOf(id)!=-1)


        //remove members from group.members
        group.members = group.members.filter(id=>membersToRemove.indexOf(id.toString())==-1);
        await group.save()

        //remove groupId from all  user.groups
        membersToRemove.forEach(async (id)=>{
            const user = await User.findById(id);
            user.groups = user.groups.filter(group=>group._id!=req.params.group_id);
            await user.save();
        })
        res.json(group.members);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

})

//@ROUTE       PUT '/api/groups/:group_id/join' / RETURN group.member
//@DESC        join a group-only for public groups
//@access      PRIVATE
router.put('/:id/join',auth,async(req,res)=>{
    try {
        const group = await Group.findById(req.params.id);
        const user = await User.findById(req.user.id);


        if(!group){
            return res.status(404).json({errors:[{msg:'Group Not Found'}]})
        }
        if(!group.public){
            return res.status(401).json({errors:[{msg:'Not Authorized. Group is Private.'}]})
        }

        //check if user is in blockList of the group
        const isBlocked = group.blockList.indexOf(req.user.id)!=-1;
        if(isBlocked){
            return res.status(401).json({errors:[{msg:'You have been blocked from this group'}]})
        }
        
        //check if user is Already in group.members
        const isAlreadyInGroup = group.members.indexOf(req.user.id)!=-1 || user.groups.map(group=>group._id).indexOf(req.params.id)!=-1;
        if(isAlreadyInGroup){
            return res.status(401).json({errors:[{msg:'User already in the group'}]});
        }

        //add user to group.members
        group.members.unshift(req.user.id);
        await group.save()

        //add groupId to user.groups
        user.groups.unshift({_id:req.params.id});
        await user.save();

        res.json(group.members)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


//@ROUTE       PUT '/api/groups/:group_id/leave' / RETURN group.member
//@DESC        leave a group
//@access      PRIVATE
router.put('/:id/leave',auth,async(req,res)=>{
    try {
        const group = await Group.findById(req.params.id);
        const user = await User.findById(req.user.id);


        if(!group){
            return res.status(404).json({errors:[{msg:'Group Not Found'}]})
        }
        

        //check if user is in group.members
        const isInGroup = group.members.indexOf(req.user.id)!=-1 &&
        user.groups.map(group=>group._id).indexOf(req.params.id)!=-1;
        if(!isInGroup){
            return res.status(401).json({errors:[{msg:"User is'nt in the group"}]});
        }
        //check if user is the admin of the group>>delete group.
        if(req.user.id==group.admin){
            //delete group in user.groups for all members.
            group.members.forEach(async(id)=>{
                try {
                    const member = await User.findById(id);
                member.groups = member.groups.filter(group=>group._id!=req.params.id);
                await member.save()
                } catch (err) {
                    console.log(err.message)
                    return res.status(500).json('Server Error');
                }
            });
            await Group.findByIdAndDelete(req.params.id)
            return res.json({msg:'Group Deleted'})
        }else{
        //delete user from group.members
            group.members = group.members.filter(id=>id!=req.user.id);
            await group.save();

        //delete group from user.groups
            user.groups = user.groups.filter(group=>group._id!=req.params.id);
            await user.save();

        res.json(group.members)
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})



//@ROUTE       PUT '/api/groups/blockusers/:group_id'/ RETURN group
//@DESC        block a user or a list of users(only by admin)
//@access      PRIVATE
router.put('/blockusers/:id',[auth,[
    body('users','No User Is Selected').not().isEmpty(),
]],async(req,res)=>{

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
      const group = await Group.findById(req.params.id);
      if(!group){
          return res.status(404).json({errors:[{msg:'Group Not Found'}]})
      }
      //check user should be admin
      
      if(req.user.id!=group.admin ){
            return res.status(401).json({errors:[{msg:'Not Authorized.Only Admin can block members in a group.'}]})
      }
 
      const newList = req.body.users.split(',').map(id=>id.trim())
      
      //check if any of the users is already in blocklist
      
      const blockList = newList.filter(idx=>group.blockList.indexOf(idx)===-1);

      //check if any of the users is already in group->>remove user from group
      
        blockList.forEach(idx=>{
            idxInMembers = group.members.indexOf(idx)
            if(idxInMembers!==-1){
                group.members.splice(idxInMembers,1);
            }
        });
        
        //add to blockList
        group.blockList.push(...blockList);
        
        await group.save()
        res.json(group.blockList)
      
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error')
  }
})


//@ROUTE       PUT '/api/groups/unblockusers/:group_id'/ RETURN group
//@DESC        unblock a user or a list of users(only by admin)
//@access      PRIVATE
router.put('/unblockusers/:id',[auth,[
    body('users','No User Is Selected').not().isEmpty(),
]],async(req,res)=>{

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
      const group = await Group.findById(req.params.id);
      if(!group){
          return res.status(404).json({errors:[{msg:'Group Not Found'}]})
      }
      //check user should be admin
      
      if(req.user.id!=group.admin ){
            return res.status(401).json({errors:[{msg:'Not Authorized.Only Admin can unblock users for a group.'}]})
      }
 
      const newList = req.body.users.split(',').map(id=>id.trim())
      
      //check if users ARE in blocklist
      
      const unblockList = newList.filter(idx=>group.blockList.indexOf(idx)!==-1);
      

      
        
        //remove from blockList
        group.blockList = group.blockList.filter(idx=>{
            console.log(idx)
            console.log(unblockList)
            return unblockList.indexOf(idx.toString())===-1
        });

        
        await group.save()
        res.json(group.blockList)
      
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error')
  }
})


//@ROUTE       DELETE '/api/groups/:group_id'
//@DESC        delete a group(only by admin)
//@access      PRIVATE
router.delete('/:id',auth,async(req,res)=>{
    try {
        //#1check if the current user is the admin of the group.
        //#2delete groupId from groups in every member user table
        const group = await Group.findById(req.params.id);

        if(!group){
            return res.status(404).json({msg:"Group Does'nt Exist"})
        }

        if(req.user.id!=group.admin){
            return res.status(401).json({msg:'Not Authorized. Only Admin can delete the group.'})
        }

        //delete group in user.groups for all members.
        group.members.forEach(async(id)=>{
            const member = await User.findById(id);
            member.groups = member.groups.filter(group=>group._id!=req.params.id);
            await member.save()
            } )

        //delete all the posts in the group
        await Post.deleteMany({group:req.params.id});

        //delete the group
        await Group.findByIdAndDelete(req.params.id);
        res.json({msg:'Group Deleted'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})




module.exports = router;