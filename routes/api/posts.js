const express = require('express');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const {body,validationResult} = require('express-validator');
const User = require('../../models/User');

const router = express.Router();



//@route    POST  /api/posts
//desc     create a post
//@access  private
router.post('/',[auth,
    body('text','text content is required').notEmpty()
],async (req,res)=> {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
  const postField = {
      text:req.body.text,
      user:req.user.id,
      name:user.name,
      avatar:user.avatar
  }
  
      const post = new Post(postField);
      await post.save()
      res.json(post);
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error')
  }

})

//route     GET api/posts
//desc      get all posts
//access    private
router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//route     GET api/posts/:post_id
//desc      get a post by id
//access    private
router.get('/:post_id',auth,async(req,res)=>{
    try {

        const post = await Post.findById(req.params.post_id);
        
        if(!post) return res.status(404).json({msg:'Post Not Found'})
        
        res.json(post)

    } catch (err) {
        console.log(err.message);
        if (err.kind==='ObjectId') return res.status(404).json({msg:'Post Not Found'})
        res.status(500).send('Server Error')
    }
})


//route     DELETE api/posts/:post_id
//desc      delete a post
//access    private
router.delete('/:post_id',auth,async(req,res)=>{
    try {

        const post = await Post.findById(req.params.post_id);

        if(!post) return res.status(404).json({msg:'Post Not Found!'})
        
        //check if user is the owner of post
        if(post.user.toString()!=req.user.id) return res.status(401).json({msg:"not Authorized"});

        await Post.findByIdAndDelete(req.params.post_id);

        res.json({msg:"removed!"})

    } catch (err) {
        console.log(err.message);
        if(err.kind==='ObjectId')  return res.status(404).json({msg:'Post Not Found!'})
        res.status(500).send('Server Error')
    }
})


//@route      PUT api/posts/like/:post_id
//@desc       like a post
//@access     private
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if post exists
        if(!post) return res.status(404).json({msg:'Post Not Found'})


        //check to see user hasnt liked it before

        if(post.likes.filter(like=>like.user==req.user.id).length>0) return res.status(400).json({msg:'User Already Liked the Post'})
        
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }})
    

//@route      PUT api/posts/unlike/:post_id
//@desc       unlike a post
//@access     private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if post exists
        if(!post) return res.status(404).json({msg:'Post Not Found'})


        //check to see user hasnt liked it before
        if(post.likes.filter(like=>like.user==req.user.id).length==0) return res.status(400).json({msg:"User Did'nt Liked the Post before."})
        
        const idxToRemove = post.likes.map(like=>like.user).indexOf(req.user.id);
        post.likes.splice(idxToRemove,1)
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }})
    
//@route    POST  /api/posts/comment/:post_id
//desc     create a comment for a post
//@access  private
router.post('/comment/:id',[auth,
    body('text','text content is required').notEmpty()
],async (req,res)=> {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
  const commentField = {
      text:req.body.text,
      user:req.user.id,
      name:user.name,
      avatar:user.avatar
  }
      const post = await Post.findById(req.params.id)
      if(!post) return res.status(404).json({msg:'Post Not Found'})
      post.comments.unshift(commentField);
      await post.save()
      res.json(post.comments);
  } catch (err) {
      console.log(err.message);
      if(err.kind==='ObjectId') return res.status(404).json({msg:'Post Not Found'})
      res.status(500).send('Server Error')
  }

})

//@route    DELETE  /api/posts/comment/:post_id/:comment_id
//desc     delete a comment
//@access  private
router.delete('/comment/:post_id/:comment_id',auth,async (req,res)=> {
  try {
    const post = await Post.findById(req.params.post_id);

      if(!post) return res.status(404).json({msg:'Post Not Found'})

      //check if current user is the owner of the comment
      const currentComment = post.comments.find(comment=>comment.id==req.params.comment_id);

    if(!currentComment) return res.status(404).json({msg:'Post Not Found'})

      if(currentComment.user!=req.user.id) return res.status(401).json({msg:'Not Authorized'});
      
    const idxToRemove = post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);

    post.comments.splice(idxToRemove,1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
      console.log(err.message);
      if(err.kind==='ObjectId') return res.status(404).json({msg:'Post Not Found'})
      res.status(500).send('Server Error')
  }

})



module.exports = router;