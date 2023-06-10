import React from 'react';

const PostCardSkeleton = () => {
    return (
        <div className='w-full border flex flex-col bg-white'>
            <div className='h-44 md:h-96 relative'>
                <span className='bg-slate-300' />
            </div>

            <div className='flex flex-col gap-y-5 my-5 px-2 sm:px-5'>
                <div className='flex gap-x-2'>
                    <span className='rounded-full h-12 w-12 bg-slate-500' />
                    <div className='flex flex-col justify-between'>
                        <span className='w-[7ch] h-5 bg-slate-300 rounded'></span>
                        <span className='w-[7ch] h-5 bg-slate-300 rounded'></span>
                    </div>
                </div>
                <span className='bg-slate-300 w-full h-5 rounded' />
                <div className='flex flex-wrap gap-x-5 gap-y-2'>
                    <span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'></span>
                    <span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'></span>
                    <span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'></span>
                </div>
                <div className='flex gap-x-5'>
                    <span className='flex gap-x-2 items-center'><i className="fa-regular fa-eye"></i><span className='w-[5ch] h-5 bg-slate-300'/></span>
                </div>
            </div>

        </div>
    );
}

export default PostCardSkeleton;
