import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../redux/slices/auth';

const Header = () => {
    const [menu, setMenu] = useState(false);
    const isAuthenticated = useSelector(selectIsAuth);
    const userdata = useSelector(state => state.auth.data);
    const dispatch = useDispatch();
    const onLogout = () => {
        if(window.confirm('You sure you want to logout?')){
            dispatch(logout());
            localStorage.removeItem('token');
        }
    }

    return (
        <>
            <header className='flex justify-between h-14 items-center px-5 sm:px-20 xl:px-52 2xl:px-72 bg-white font-medium border-b shadow z-50 fixed w-full'>
                <Link to={'/'} className='text-3xl drop-shadow-lg font-semibold cursor-pointer'>ABOBABlog</Link>
                {!isAuthenticated ?
                    <div className='hidden sm:flex gap-x-10'>
                        <Link to={'/login'} className='cursor-pointer'>Login</Link>
                        <Link to={'/register'} className='cursor-pointer bg-black text-white px-1 rounded'>Register</Link>
                    </div>
                    :
                    <div className='hidden sm:flex gap-x-10'>
                        <Link className='cursor-pointer bg-black text-white px-1 rounded' to={'/post/create'}>Add post</Link>
                        <span className='cursor-pointer' onClick={() => onLogout()}>Logout</span>
                    </div>}
                <i className="fa-solid fa-bars sm:hidden cursor-pointer text-2xl" onClick={() => setMenu(!menu)}></i>
            </header>
            {!isAuthenticated ?
                <div className={`flex flex-col sm:hidden gap-y-3 py-2 absolute bg-white font-medium duration-300 w-full items-center left-0 border-b ${menu ? `top-14` : `-top-20`} z-10`}>
                    <Link to={'/login'} className='cursor-pointer'>Login</Link>
                    <Link to={'/register'} className='cursor-pointer'>Register</Link>
                </div>
                :
                <div className={`flex flex-col sm:hidden gap-y-3 py-2 absolute bg-white font-medium duration-300 w-full items-center left-0 border-b ${menu ? `top-14` : `-top-20`} z-10`}>
                    <span className='cursor-pointer'>Profile</span>
                    <span onClick={()=>onLogout()} className='cursor-pointer'>Logout</span>
                </div>}
        </>
    );
}

export default Header;
