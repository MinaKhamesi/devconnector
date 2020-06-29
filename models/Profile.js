const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type:ObjectId,
        ref: 'User'
    },
    company:String,
    website: String,
    location: String,
    status:{
        type:String,
        required: true},
    skills:{
        type:[String],
        required:true
    },
    bio:String,
    githubusername:String,
    social:{
        twitter:String,
        facebook:String,
        linkedin:String,
        instagram:String,
        youtube:String
    },
    education:[{
        school:{
            type:String,
            required:true},
        degree:{
            type:String,
            required:true
        },
        fieldofstudy:{
            type:String,
            required:true},
        from:{
            type:Date,
            required:true},
        to: Date,
        current:{
            type:Boolean,
            default: false},
        description:String
    }],
    experience:[{
        company:{
            type:String,
            required:true},
        title:{
            type:String,
            required:true},
        location:String,
        from:{
            type:Date,
            required:true},
        to:Date,
        current: {
            type:Boolean,
            default: false},
        description: String
    }],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Profile = mongoose.model('profile',ProfileSchema)