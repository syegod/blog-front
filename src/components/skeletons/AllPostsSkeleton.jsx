import React from 'react';
import PostCardSkeleton from './PostCardSkeleton';

const AllPostsSkeleton = () => {
    return (
        <div className='flex flex-col gap-y-5 w-full sm:w-2/3'>
            <PostCardSkeleton/>
            <PostCardSkeleton/>
            <PostCardSkeleton/>
        </div>
    );
}

export default AllPostsSkeleton;
