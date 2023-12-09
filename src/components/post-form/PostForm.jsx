import React from 'react'
import conf from "../../appwrite_config/config"
import { ID } from "appwrite"
import { Client, Databases, Permission } from 'appwrite'
import { useCallback} from 'react'
import Input from "../Input"
import Button from '../Button'
import Select from '../Select'
import RTE from "../RTE"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { getFilePreview } from "../../appwrite_services/account_service"

function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();

    const submit = async (data) => {

        let title = data.title;
        let content = data.content;
        let status = data.status;
       

        let Data = { title: title, content: content, status: status}

        const client = new Client();

        const databases = new Databases(client);

        client
            .setEndpoint(conf.aw_URL) // Your API Endpoint
            .setProject(conf.aw_ProjectId) // Your project ID
            ;
        const promise = databases.createDocument(conf.aw_DatabaseId, conf.aw_CollectionId, ID.unique(),
            Data
        );

        promise.then(function (response) {
            navigate(`/all-posts`);
            console.log(`Successfully Post Created : ${response}`); // Success

        }, function (error) {
            console.log(`Failed In Post Creation : ${error}`); // Failure
        });

    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);



    return (
        <>

            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" style={{ backgroundColor: 'antiquewhite' }}>
                <div className="w-2/3 px-2">

                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug :"
                        placeholder="Placeholder"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }}
                    />

                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />


                </div>

                <div className="w-1/3 px-2">

                    {post && (
                        <div className="w-full mb-4" >
                            <img
                                src={getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )
                    }

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-5 mt-7"
                        {...register("status", { required: true })}
                    />

                    <Button
                        type='submit'
                        bgColor={post ? "bg-green-500" : undefined}
                        className="w-full mb-4"
                    >{post ? "Update" : "Submit"}</Button>

                </div>
            </form>


        </>
    )
}



export default PostForm
