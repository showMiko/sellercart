"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useContextApi } from '@/context/context';
import { Button, notification, Space } from 'antd';
const GetStarted = () => {
    const [api, contextHolder] = notification.useNotification();
    const router=useRouter();
    const {uid,userEmail,setUid,setUserEmail}= useContextApi();
    
    const Login = () => {
        const successNoti= (type) => {
            api[type](
            {
              message: 'Login Successful',
              description:
                'Welcome to SellerCart',
            });
          };
          const ErrorNoti= (type) => {
            api[type](
            {
              message: 'Error Logging In',
              description:
                'Error in Logging In. Check Creds',
            });
          };
        const [isLoading,setIsLoading]=useState(false);
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit=async(e)=>{
            e.preventDefault();
            setIsLoading(true);
            const response=await axios.post("/api/login",{email,password});
            
            if(response.status===200)
            {
                const data=response.data.userCreds.user;
                const id=data.uid;
                localStorage.setItem('email',email);
                localStorage.setItem('uid',id);
                successNoti('success');
                setUserEmail(email);
                setUid(uid);
                setIsLoading(false);
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
            else
            {
                setIsLoading(false);
                ErrorNoti('error');
            } 
        }
        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:flex-row items-center" style={{ boxShadow: "1px 1px 10px 1px grey", backgroundColor: "white",minHeight:"90vh" }}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:w-1/2">
                    <img
                        alt="Seller Cart"
                        src="/logoTransparent.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-gray-600 hover:text-gray-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                {isLoading?"Signing in..." :"Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-10 text-center text-sm text-gray-500 w-full flex flex-col items-center">
                        Already a member?
                        <button
                                onClick={handleFlip}
                                className="mt-2 flex w-20 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                               SignUp
                            </button>
                            <div className='mt-5'>
                        <a href='/'>Go to HomePage</a>
                        </div>
                    </div>
                    
                </div>

                <div className="hidden lg:block lg:w-1/2">
                    <img
                        src="/logomain.png"
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        );
    };
    const SignUp = () => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [mobileNo, setMobileNo] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isLoading,setIsLoading]=useState(false);
        const successNoti= (type) => {
            api[type](
            {
              message: 'SignUp Successful',
              description:
                'Welcome to SellerCart',
            });
          };
          const ErrorNoti= (type) => {
            api[type](
            {
              message: 'Error Logging In',
              description:
                'Error in Logging In. Check Creds',
            });
          };
          

        const handleSubmit =async (e) => {
            e.preventDefault();
            setIsLoading(true);
            // Validate password and confirm password match
            if (password !== confirmPassword) {
                alert("Passwords don't match.");
                return;
            }
            const response =await axios.post('/api/signup',{ firstName, lastName, mobileNo, email, password });
            if(response.status===200)
            {
                const data=response.data.userCreds.user;
                const id=data.uid;
                localStorage.setItem('email',email);
                localStorage.setItem('uid',id);
                successNoti('success');
                setUserEmail(email);
                setUid(uid);
                setIsLoading(false);
                router.push("/");
            }
            else
            {
                ErrorNoti('error');
                setIsLoading(false);
            }
        };

        return (
            // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:flex-row">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:flex-row items-center" style={{ boxShadow: "1px 1px 10px 1px grey", backgroundColor: "white",minHeight:"90vh" }}>
                {/* Form on the left */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:w-1/2">
                    <img
                        alt="Seller Cart"
                        src="/logotransparent.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className='flex justify-between'>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>
                        </div>
                        <div>
                            <label htmlFor="mobileNo" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                Mobile Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="mobileNo"
                                    name="mobileNo"
                                    type="tel"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                {isLoading?"Creating Account..." :"Create Account"}
                            </button>
                        </div>
                        <div className="mt-10 text-center text-sm text-gray-500 w-full flex flex-col items-center">
                        Already a member?
                        <button
                                onClick={handleFlip}
                                className="mt-2 flex w-20 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                               Login
                            </button>
                        <div className='mt-5'>
                        <a href='/'>Go to HomePage</a>
                        </div>
                    </div>
                    </form>
                </div>

                {/* Image on the right, hidden on small screens */}
                <div className="hidden lg:block lg:w-1/2">
                    <img
                        src="/logomain.png"
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        );
    };

    const [isLogin, setIsLogin] = useState(true);
    const handleFlip = () => {
        setIsLogin(!isLogin);
    };
    useEffect(() => {
        if (userEmail && uid) {
            router.push('/');
        }
    }, [userEmail,uid,router]);
    return (
        <>
        <div
            className={`flip-card ${isLogin ? "flipped" : ""
            }` }
            
            >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                        <Login/>
                </div>
                <div className="flip-card-back">
                        <SignUp/>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default GetStarted