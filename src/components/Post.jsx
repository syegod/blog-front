import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import defaultavatar from '../testphotos/defaultavatar.png';
import remarkGfm from "remark-gfm";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import PostSkeleton from './skeletons/PostSkeleton';
import CommentCard from './CommentCard';


const Post = (props) => {
    const a = [1, 2, 3, 5];
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    let { data } = useSelector(state => state.auth);
    let isEditable = data?._id === post.user?._id;

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const response = await axios.get('/posts/' + id).catch(e => console.log(e));
            if (response?.status === 200) {
                setPost(response?.data);
            } else {
                return navigate('/');
            }
            setLoading(false);
        };
        getData();
    }, [id]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post('/comment/'+id, {comment});
            if(response.status === 201){
                setPost(response.data);
                return setComment('');
            }
        } catch (err) {
            console.log(err);
            alert('Error occured while trying to post a comment.')
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const { data } = await axios.delete('/posts/' + id);
                return navigate('/');
            } catch (err) {
                alert('Error occured while trying to delete this post.');
            };

        };
    };

    return (
        <>
            {!loading ? < div className='md:px-[5ch]' >
                <div className='flex flex-col gap-y-7 bg-white shadow'>
                    {post?.imageUrl &&
                        <div className='h-[30ch] sm:h-[55ch]'>
                            <img src={post?.imageUrl} alt="Post preview" className='object-cover h-full w-full' />
                        </div>
                    }
                    <div className={`flex flex-col gap-y-5 ${!post?.imageUrl && `my-10`} px-2 sm:px-10`}>
                        <div className='flex flex-col sm:flex-row justify-between w-full gap-y-5'>
                            <div className='flex gap-x-2'>
                                <img src={post?.user?.avatarUrl || defaultavatar} alt="Avatar" className='rounded-full h-12 w-12 object-cover cursor-pointer' />
                                <div className='flex flex-col'>
                                    <span className='cursor-pointer'>{post?.user?.username}</span>
                                    <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className='flex justify-between gap-x-5 gap-y-1 items-center'>
                                <span className='flex gap-x-2 items-center'><i className="fa-regular fa-eye"></i>{post?.viewsCount}</span>
                                {isEditable &&
                                    <div className='flex gap-x-5'>
                                        {/* <i className="fa-solid fa-pen cursor-pointer px-2 py-1 hover:bg-black duration-300 hover:text-white rounded" onClick={handleEdit}></i> */}
                                        <i className="fa-solid fa-trash cursor-pointer px-2 py-1 hover:bg-black duration-300 hover:text-white rounded" onClick={handleDelete}></i>
                                    </div>}


                                {/* <span className='flex gap-x-2 items-center'><i className={`fa-${isLiked ? `solid` : `regular`} fa-heart cursor-pointer`} onClick={() => setIsLiked(!isLiked)}></i>{likes}</span> */}
                            </div>
                        </div>
                        <div className='text-3xl font-medium break-all'>
                            {post?.title}
                        </div>
                        <div className='flex gap-x-10 gap-y-3 flex-wrap'>
                            {post?.tags?.map(e => <span key={e} className='cursor-pointer bg-slate-200 px-2 max-w-max rounded'>#{e}</span>)}
                        </div>
                        <hr />
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown'>{post.text}</ReactMarkdown>
                    </div>
                </div>
                <div className='bg-white mt-5 shadow p-5 flex flex-col gap-y-5'>
                    <span className='font-medium text-lg'>Comments:</span>
                    <div className='rounded sm:border p-3 flex flex-col sm:flex-row gap-x-3 gap-y-2'>
                        <img src={data?.avatarUrl || defaultavatar} alt="" className='hidden sm:block rounded-full h-10 w-10 object-cover cursor-pointer' />
                        <div className='w-full flex flex-col gap-y-3'>
                            <textarea type="text" className='w-full border p-3 rounded outline-none' maxLength={500} rows={3} placeholder='Write your comment...' value={comment} onChange={e => setComment(e.target.value)}/>
                            <button className='py-2 px-5 bg-black w-max text-white rounded' onClick={() => handleCommentSubmit()}>Send</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-5'>
                        {post?.comments?.map(value => <CommentCard comment={value} setPost={setPost}/>)}
                    </div>

                </div>
            </div > : <PostSkeleton />}
        </>
    );
}

export default Post;