import { createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import img1 from '../assets/loginimg.jpg'
import img2 from '../assets/logo.png'

const Signup = () => {
    const navigate = useNavigate();
    const [formVal, setformVal] = useState({
        email: "",
        password: ""
    })
    const handleSignIn = async () => {
        try {
            const { email, password } = formVal;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error)
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    })

    return (
        <div className="w-screen h-screen flex items-center justify-center relative">
            <img src={img1} alt='background image' className="object-auto w-full h-full" />
            <img src={img2} alt='logo image' className="absolute h-20 left-10 top-11" />
            <div className="absolute">
                <h1 className="text-white text-6xl font-extrabold">Unlimited movies, TV shows and more..</h1>
                <h3 className='text-center text-white text-3xl font-medium mt-6'>Watch anywhere. Cancel anytime</h3>
                <div className="flex items-center justify-center flex-col gap-4 mt-5">
                    <input type="email"
                        className='h-14 w-2/4 rounded-md border-2 border-gray-600 custom-placeholder'
                        placeholder='Email'
                        name='email'
                        style={{ paddingLeft: '10px' }}
                        value={formVal.email}
                        onChange={(e) => setformVal({ ...formVal, [e.target.name]: e.target.value })}
                    />

                    <input type="password"
                        className='h-14 w-2/4 rounded-md border-2 border-gray-600 custom-placeholder'
                        placeholder='Add a password'
                        name='password'
                        style={{ paddingLeft: '10px' }}
                        value={formVal.password}
                        onChange={(e) => setformVal({ ...formVal, [e.target.name]: e.target.value })}
                    />
                    <button
                        className="bg-red-700 text-white text-xl justify-center rounded-lg h-20 w-1/2  hover:bg-red-600"
                        onClick={handleSignIn}>Get Started</button>
                </div>
            </div>
            <button className="bg-red-600 text-white rounded-lg h-10 w-20 absolute top-12 right-12">
                <Link to="/login">Log In</Link>
            </button>
        </div>
    )
}

export default Signup;
