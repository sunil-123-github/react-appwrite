import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../redux_store/slices/authSlice'
import { Button, Input } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Client,Account } from 'appwrite'
import conf from '../appwrite_config/config.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()


    function create(data) {
        const client = new Client();
        const account = new Account(client);
        client
            .setEndpoint(conf.aw_URL)
            .setProject(conf.aw_ProjectId);
        ;
        const promise = account.create('1',data.email,data.password);
        promise.then(function (response) {
            if (response) dispatch(login(response));
            navigate("/")
            console.log(response); // Success
            console.log("Account Successfully Created .")
        }, function (error) {
            console.log(setError(error)); // Failure
        });
    }




    return (
        <div className="flex items-center justify-center mt-6">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 mt-6`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">

                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                        <Button type="submit" className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup