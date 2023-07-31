import React from 'react';
import styled from "styled-components";
import { BiX } from "react-icons/bi";
import { useNavigate, useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const Player = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get("videoId");

    const opts = {
        height: window.innerHeight,
        width: window.innerWidth,
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <Container >
            <div className='relative'>

                <div
                    className="absolute cursor-pointer top-16 right-8 text-red-900 rounded-full transition-colors hover:bg-red-600 hover:text-white"
                    onClick={() => navigate(-1)}
                >
                    <BiX className="text-5xl font-extrabold top" />
                </div>

                {videoId && (
                    <YouTube videoId={videoId} opts={opts} />
                )}
            </div>
        </Container>
    )
}
const Container = styled.div``
    ;

export default Player;

