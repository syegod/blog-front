import React, { useEffect, useState } from 'react';
import landscape1 from '../testphotos/landscape1.jpg'
import { Link } from 'react-router-dom';
import defaultavatar from '../testphotos/defaultavatar.png';
import { useSelector } from 'react-redux';

const PostCard = (props) => {
    const { post } = props;

    return (
        <div className='w-full border flex flex-col bg-white'>
            {
                post?.imageUrl &&
                <div className='h-44 md:h-96 relative'>
                    <Link to={'/post/' + post?._id}><img src={post?.imageUrl} alt="Post preview" className='w-full object-cover h-full absolute transition-all cursor-pointer' /></Link>
                </div>
            }
            <div className='flex flex-col gap-y-5 my-5 px-2 sm:px-5'>
                <div className='flex gap-x-2'>
                    <img src={post?.user?.avatarUrl || defaultavatar} alt="Avatar" className='rounded-full h-12 w-12 object-cover cursor-pointer' />
                    <div className='flex flex-col'>
                        <span className='cursor-pointer'>{post?.user?.username}</span>
                        <span>{new Date(post.createdAt).getHours()}:{new Date(post.createdAt).getMinutes()} {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <Link to={'/post/' + post?._id} className='text-4xl font-semibold cursor-pointer break-all'>
                    {post?.title}
                </Link>
                <div className='flex flex-wrap gap-x-5 gap-y-2'>
                    {post?.tags?.map(e => {
                        return <span key={e} className='bg-slate-200 px-2 max-w-max hover:text-white transition-all rounded cursor-pointer'>#{e}</span>
                    })}
                </div>
                <div className='flex gap-x-5'>
                    <span className='flex gap-x-2 items-center'><i className="fa-regular fa-eye"></i>{post?.viewsCount}</span>
                </div>
            </div>

        </div>
    );
}

export default PostCard;
