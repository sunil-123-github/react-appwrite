import React from "react";
import { useState, useEffect } from "react";
import service from "../appwrite_services/account_service";
import Container from "../components/container/Container";
import { PostCard } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPost] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        service.getAllPosts().then((posts) => {
            if (posts) {
                setPost(posts.documents);
            }
        })

    }, [])

    
  const handleSignIn = () => {
    navigate('/login');
  };


    // TODO : posts.length === 0 in if condition

    if (true) {
        return (
            <div className="w-full py-8 mt-6 text-center">
                <Container>
                    <div className="flex mt-6 flex-wrap justify-center	">
                        <div className="p-2 mt-6 flex  items-center justify-center w-full text-white h-28 w-2/4 "
                            style={{ "background": "antiquewhite" }}>
                            <button className="px-4 py-2 rounded-lg bg-pink-600 text-white " onClick={handleSignIn} >
                                Log In To Read Blogs
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home