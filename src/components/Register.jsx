import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';

const Register = () => {
    const [form, setForm] = useState({
        email: '', password: '', username: ''
    })
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    if(isAuth){
        return <Navigate to={'/'}/>
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchRegister(form));
        if(data.payload && 'token' in data.payload){
            localStorage.setItem('token', data.payload.token);
        } else {
            alert('Error occured.')
        }
    }  
    const handleFormChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    return (
        <form className='flex flex-col gap-y-10 items-center text-xl mt-20 sm:mt-44 bg-white shadow mx-auto max-w-max p-10' onSubmit={handleFormSubmit}>
            <span className='text-2xl font-medium'>Registration</span>
            <hr className='w-full'/>
            <div className='flex flex-col gap-y-5'>
                <div className='flex flex-col'>
                    <span>Username:</span>
                    <input type="text" required onChange={handleFormChange} className='border-2 outline-none px-1' name='username' />
                </div>
                <div className='flex flex-col'>
                    <span>Email:</span>
                    <input type="email" required onChange={handleFormChange} className='border-2 outline-none px-1' name='email' />
                </div>
                <div className='flex flex-col'>
                    Password:
                    <input type="password" required onChange={handleFormChange} className='border-2 outline-none px-1' name='password' minLength={5}/>
                </div>
            </div>
            <button type='submit' className='text-white bg-black px-5 py-1 rounded'>Register</button>
        </form>
    );
}

export default Register;
