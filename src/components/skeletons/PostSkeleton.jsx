import React from 'react';

const PostSkeleton = () => {
    return (
        <div>
            <div className='flex flex-col gap-y-7 bg-white shadow pb-5'>
                <div className='h-[30ch] sm:h-[55ch]'>
                    <div className='bg-slate-300 h-full w-full' />
                </div>
                <div className={`flex flex-col gap-y-5 px-2 sm:px-10`}>
                    <div className='flex flex-col sm:flex-row justify-between w-full gap-y-5'>
                        <div className='flex gap-x-2'>
                            <div alt="Avatar" className='rounded-full h-12 w-12 bg-slate-500' />
                            <div className='flex flex-col justify-between w-[5rem]'>
                                <span className='bg-slate-300 w-full h-5 rounded-md'></span>
                                <span className='bg-slate-300 w-full h-5 rounded-md'></span>
                            </div>
                        </div>
                        <div className='flex justify-between gap-x-5 gap-y-1 items-center'>
                            <span className='flex gap-x-2 items-center'><i className="fa-regular fa-eye"></i><span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'/></span>
                        </div>
                    </div>
                    <span className='bg-slate-300 w-full h-10 rounded-md' />
                    <div className='flex gap-x-10 flex-wrap'>
                        <span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'></span>
                        <span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'></span>
                        <span className='cursor-pointer bg-slate-300 px-2 w-[5ch] rounded h-5'></span>
                    </div>
                    <hr />
                    <div className='bg-slate-300 rounded w-full h-[10ch]'/>
                </div>
            </div>
        </div>
    );
}

export default PostSkeleton;
