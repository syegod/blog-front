import React, { useCallback, useEffect, useRef, useState } from 'react';
import MultiSelect from './MultiSelect';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectIsAuth } from '../redux/slices/auth';
import "easymde/dist/easymde.min.css";
import axios from '../axios';
import { MarkdownEditor } from './MarkdownEditor';

const CreatePost = (props) => {
    const {isCreation} = props;
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [text, setText] = useState('');

    const navigate = useNavigate();
    const fileRef = useRef();
    const isAuth = useSelector(selectIsAuth);

    const onChangeText = useCallback((value) => {
        setText(value);
      }, []);
    
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const form = {
                title,
                tags,
                text,
                imageUrl
            }
            const {data} = await axios.post('/posts', form);
            const id = data._id;
            return navigate(`/post/${id}`);
        } catch (err) {
            console.warn('Error occurred while trying to upload the post.');
        }
    }

    const handleTags = (e) => {
        setTags(e);
    }
    const handlePreview = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            if ('url' in data) {
                setImageUrl(process.env.REACT_APP_BACKEND + data.url);
            }
        } catch (err) {
            console.log('Error occurred while trying to upload the file.')
        }
    }

    if (!localStorage.getItem('token') && !isAuth) {
        return <Navigate to={'/'} />
    }

    

    return (
        <div className='px-5 sm:px-[10ch] py-10 bg-white shadow flex flex-col gap-y-10'>
            <div className='text-4xl font-medium text-center'>Post creation</div>
            <form className='flex flex-col gap-y-5 sm:gap-y-10 w-full' onSubmit={handleForm}>
                <div className='flex flex-wrap gap-x-5'>
                    <button className='rounded bg-black text-white p-3 max-w-max w-full' type='button' onClick={() => fileRef.current.click()}>Add preview</button>
                    {imageUrl && <button className='rounded bg-red-500 text-white p-3 max-w-max w-full' type='button' onClick={() => setImageUrl('')}>Remove preview</button>}
                </div>
                <input ref={fileRef} type="file" id="preview" accept='image/*' className='hidden' onChange={handlePreview} />
                {imageUrl &&
                    <div className='h-[30ch] sm:h-[55ch]'>
                        <img src={imageUrl} alt="Post preview" className='object-cover h-full w-full' />
                    </div>
                }
                <textarea onChange={onChangeTitle} className='border-b p-4 text-3xl outline-none' name="title" id="" rows="2" placeholder='Write your title...' maxLength={95}></textarea>
                <MultiSelect getValues={handleTags} entryValues={['Development', 'Games', 'Twitch', 'YouTube', 'Anime', 'ESports', 'Sports', 'Dota 2', 'CSGO', 'Fortnite', 'Food', 'Fashion', 'Minecraft', 'Offtop']} />
                <MarkdownEditor onChange={onChangeText}/>
                <button type='submit' className='rounded bg-black text-white p-3 max-w-max w-full mx-auto'>Submit</button>
            </form>

        </div>
    );
}

export default CreatePost;
