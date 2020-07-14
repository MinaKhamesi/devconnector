const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    public:{
        type:Boolean,
        required:true,
        default:true
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    admin_name:String,
    admin_avatar:String,
    members:[{
            type:Schema.Types.ObjectId,
            ref: 'user'   
        }
    ],
    blockList:[{
        type:Schema.Types.ObjectId,
        ref: 'user'
    }],
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = Group = mongoose.model('group',GroupSchema);