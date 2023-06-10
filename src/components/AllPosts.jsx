import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPostsByViews } from '../redux/slices/posts';
import AllPostsSkeleton from './skeletons/AllPostsSkeleton';

const AllPosts = () => {
    const [sorting, setSorting] = useState(1);
    const dispatch = useDispatch();
    let { posts } = useSelector(state => state.posts);
    
    const isPostLoading = posts.status === 'loading';
    useEffect(() => {
        if (sorting === 1) {
            dispatch(fetchPosts());
        }
        if (sorting === 2) {
            dispatch(fetchPostsByViews());
        }
    }, [sorting]);
    return (
        <div className='flex flex-1 flex-col gap-y-5 mt-6'>
            <div className='flex gap-x-5 mx-auto'>
                <span className={`${sorting === 1 && 'border-b'} border-black cursor-pointer select-none`} onClick={() => setSorting(1)}>Newest</span>
                <span className={`${sorting === 2 && 'border-b'} border-black cursor-pointer select-none`} onClick={() => setSorting(2)}>Popular</span>
            </div>
            <div className='flex flex-1 gap-y-10 justify-center'>
            {!isPostLoading ?<div className='flex flex-col gap-y-5 w-full sm:w-2/3'>
                     {posts?.items?.map((elem, i) => <PostCard key={i} post={elem} />)}
                </div> : <AllPostsSkeleton />}
            </div> 
        </div>
    );
}

export default AllPosts;
