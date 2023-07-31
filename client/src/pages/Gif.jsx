import React from 'react';
import Gojo from '../assets/Gojo.mp4';

const Gif = () => {
    return (
        <div className='relative w-screen h-screen'>
            <video src={Gojo} autoPlay loop controls className='w-full h-full object-cover'></video>
            <h1 className='absolute bottom-24 left-0 right-0 text-white text-4xl font-sans font-bold text-center'>
                “Throughout Heaven and Earth, I alone am the Honored One.”
            </h1>
        </div>
    );
};

export default Gif;
