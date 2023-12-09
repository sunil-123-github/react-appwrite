import React, { useState, useEffect } from "react";
import { Client, Databases } from "appwrite";
import conf from "../appwrite_config/config";
import parse from "html-react-parser";


function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [buttonTexts, setButtonTexts] = useState({});
  const [buttonColors, setButtonColors] = useState({});

  useEffect(() => {
    const client = new Client()
      .setEndpoint(conf.aw_URL)
      .setProject(conf.aw_ProjectId);
    const databases = new Databases(client);
    let promise = databases.listDocuments(
      conf.aw_DatabaseId,
      conf.aw_CollectionId
    );

    promise.then(
      function (response) {
        const posts = response.documents;
        setPosts(posts);
        // Initialize button states for each post
        const initialButtonTexts = {};
        const initialButtonColors = {};
        posts.forEach((post) => {
          initialButtonTexts[post.$id] = 'Like';
          initialButtonColors[post.$id] = undefined;
        });
        setButtonTexts(initialButtonTexts);
        setButtonColors(initialButtonColors);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  const onClick = (postId) => {
    // Toggle like state for the specific post
    setButtonTexts((prevButtonTexts) => ({
      ...prevButtonTexts,
      [postId]: prevButtonTexts[postId] === 'Like' ? 'Liked' : 'Like',
    }));

    setButtonColors((prevButtonColors) => ({
      ...prevButtonColors,
      [postId]: prevButtonColors[postId] === 'darkgreen' ? undefined : 'darkgreen',
    }));
  };

  return (
    <>
      <div className=" py-8">
        <div className="">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="py-2 mt-3 w-full text-center rounded-full"
              style={{ background: 'darkslateblue', color: 'white' }}
            >
              <div className="p-4">
                <h4 className="font-semibold text-xl mb-2">
                  {post.title == undefined ? null : parse(post.title)}
                </h4>
                <p className="text-gray-700 text-base text-white">
                  {post.content == undefined ? null : parse(post.content)}
                </p>
                <button
                  onClick={() => onClick(post.$id)}
                  style={{ backgroundColor: buttonColors[post.$id] }}
                  className="bg-pink-700 mt-5 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded"
                >
                  {buttonTexts[post.$id]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllPosts;












