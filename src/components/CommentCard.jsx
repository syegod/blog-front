import axios from '../axios.js';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import defaultavatar from '../testphotos/defaultavatar.png'

const CommentCard = (props) => {
    const { comment, setPost } = props;
    let { data } = useSelector(state => state.auth);
    let isEditable = data?._id === comment?.user?._id;
    // const [isLiked, setIsLiked] = useState(false);

    const handleDelete = async () => {
        const response = await axios.delete('/comment/' + comment._id).catch(e => alert(e.response.data.message));
        if (response?.status === 200) {
            return setPost(response.data);
        }
    };

    return (
        <div className='w-full border rounded flex flex-col p-3 gap-y-2'>
            <div className='flex flex-col sm:flex-row justify-between w-full gap-y-5'>
                <div className='flex gap-x-2'>
                    <img src={comment?.user?.avatarUrl || defaultavatar} alt="Avatar" className={`rounded-full h-10 w-10 object-cover cursor-pointer`} />
                    <div className='flex flex-col'>
                        <span className='cursor-pointer'>{comment?.user?.username}</span>
                        <span>{new Date(comment?.createdAt).toLocaleTimeString()} {new Date(comment?.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className='flex items-center gap-x-3'>
                    {/* {isEditable ? <span className='flex gap-x-2 items-center'><i className={`fa-solid fa-heart `}></i>{comment.likes}</span> : */}
                        {/* <span className='flex gap-x-2 items-center'><i className={`fa-${isLiked ? `solid` : `regular`} fa-heart cursor-pointer`} onClick={() => setIsLiked(!isLiked)}></i>{comment.likes}</span>} */}
                    {isEditable && <i className='fa-solid fa-trash cursor-pointer' onClick={handleDelete}></i>}
                </div>
            </div>
            <div className='break-all'>
                {comment.text}
            </div>
        </div>
    );
}

export default CommentCard;
