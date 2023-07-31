import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import img1 from '../assets/loginimg.jpg'
import img2 from '../assets/logo.png'

const Login = () => {
    const navigate = useNavigate();
    const [formVal, setformVal] = useState({
        email: "",
        password: ""
    })
    const handleLogIn = async () => {
        try {
            const { email, password } = formVal;
            await signInWithEmailAndPassword(firebaseAuth, email, password);
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
            <button className="bg-red-600 text-white rounded-lg h-10 w-20 absolute top-12 right-12 text-lg">
                <Link to="/signup">Sign In</Link>
            </button>
            <div className="absolute flex flex-1 h-1/3 w-1/4 bg-black bg-opacity-90 justify-center rounded-3xl">
                <div className="flex items-center justify-center flex-col gap-4 mt-5">
                    <h2 className="text-white text-center text-2xl font-semibold">Login</h2>
                    <input type="email"
                        className='h-12 w-80 rounded-md border-2 border-gray-600 custom-placeholder'
                        placeholder='Email'
                        name='email'
                        style={{ paddingLeft: '10px' }}
                        value={formVal.email}
                        onChange={(e) => setformVal({ ...formVal, [e.target.name]: e.target.value })}
                    />

                    <input type="password"
                        className='h-12 w-80 rounded-md border-2 border-gray-600 custom-placeholder'
                        placeholder='Password'
                        name='password'
                        style={{ paddingLeft: '10px' }}
                        value={formVal.password}
                        onChange={(e) => setformVal({ ...formVal, [e.target.name]: e.target.value })}
                    />
                    <button className="bg-red-700 text-white rounded-lg h-12 w-80 hover:bg-red-600" onClick={handleLogIn}>
                        <Link to="/login">Log In</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
