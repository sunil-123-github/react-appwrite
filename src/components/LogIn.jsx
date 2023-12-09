import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../redux_store/slices/authSlice'
import { Button, Input } from "./index"
import { useDispatch } from "react-redux"
import authService from '../appwrite_services/auth'
import { useForm } from "react-hook-form"
import { Client, Account, ID } from "appwrite";
import conf from '../appwrite_config/config.js'



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        const client = new Client()
            .setEndpoint(conf.aw_URL) // Your API Endpoint
            .setProject(conf.aw_ProjectId);  // Your project ID
        const account = new Account(client);
        const promise = account.createEmailSession(data.email, data.password);
        promise.then(function (response) {
            if (true) dispatch(authLogin(true));
            navigate("/")

        }, function (error) {
            console.log(error); // Failure
        });

    }

    return (
        <div
            className='flex items-center justify-center w-full mt-6'
        >
            <div className={`mx-auto mt-6 w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">

                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login