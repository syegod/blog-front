import React, { useState } from 'react';

const Modal = (props) => {
    const {setIsOpen} = props;
    return (
        <div className='w-full absolute left-0 top-0 min-h-screen'>
                <div className='absolute w-full h-full z-10' onClick={() => setIsOpen(false)}>test</div>
                <div className='z-50 w-full top-1/3 absolute'>
                    <div className='bg-white max-w-max mx-auto max-w-[30ch] text-center'>
                        {props.children}
                    </div>
                </div>
        </div>
    );
}

export default Modal;
