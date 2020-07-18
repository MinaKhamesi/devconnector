import React from 'react';
import PostItem from '../posts/PostItem';

const GroupPosts = ({posts,groupId}) => <div className="posts">
{posts.length===0 ? <h4 className='p-4'>No Post Yet</h4> : posts.map(post=><PostItem key={post._id} post={post} groupId={groupId}/>) }
</div>

export default GroupPosts;
