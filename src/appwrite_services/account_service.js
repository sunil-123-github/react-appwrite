import conf from "../appwrite_config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.aw_URL)
            .setProject(conf.aw_ProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, featuredImage, content, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.aw_DatabaseId,
                conf.aw_CollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch (error) {
            console.log(`Error in Creating Post :: ${error}`);
        }
    }

    async updatePost(slug, {
        title,
        content,
        featuredImage,
        status
    }) {
        try {
            return await this.databases.updateDocument(
                conf.aw_DatabaseId,
                conf.aw_CollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }

            )
        }
        catch (error) {
            console.log(`Error in Updating Post :: ${error}`);
        }
    }
    async deletePost(
        slug
    ) {
        try {
            await this.databases.deleteDocument(
                conf.aw_DatabaseId,
                conf.aw_CollectionId,
                slug
            )
            return true;
        }
        catch (error) {
            console.log(`Error in Deleting Post :: ${error}`);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.aw_DatabaseId,
                conf.aw_CollectionId,
                slug
            )

        }
        catch (error) {
            console.log(`Error in getting Post :: ${error}`);
        }

    }
    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.aw_DatabaseId,
                conf.aw_CollectionId,
                queries
            )
        }
        catch (error) {
            console.log(`Error in getting All Posts :: ${error}`);
            return false;
        }
    }

    // File Upload Service

    // async uploadFile(file) {
    //     try {
    //         return await this.bucket.createFile(
    //             
    //             ID.unique(),
    //             file
    //         )

    //     }
    //     catch (error) {
    //         console.log("Failed In File Uploading")
    //        // console.log(`Error in Uploading File :: ${error}`);
    //         return false;
    //     }
    // }


    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.aw_BucketId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log(`Error in Deleting File :: ${error}`);
            return false;
        }
    }

    // getFilePreview(fileId) {
    //     return this.bucket.getFilePreview(
    //         conf.aw_BucketId,
    //         fileId
    //     )
    // }

}

function uploadFile(file) {
    const client = new Client()
        .setEndpoint(conf.aw_URL)
        .setProject(conf.aw_ProjectId);

    const storage = new Storage(client);

    const promise = storage.createFile(
        conf.aw_BucketId,
        ID.unique(),
        file
    );

    promise.then(function (response) {
        console.log(`Succesfully File Uploaded : ${response}`); // Success
    }, function (error) {
        console.log(`Failed In File Uploading : ${error}`); // Failure
    });
}

function updateFile(aw_DatabaseId, aw_CollectionId, uniqueId, { }) {
    const client = new Client()
        .setEndpoint(conf.aw_URL)
        .setProject(conf.aw_ProjectId);

    const databases = new Databases(client);

    const promise = databases.createDocument(
        aw_DatabaseId,
        aw_CollectionId,
        uniqueId,
        {}
    );

    promise.then(function (response) {
        console.log(`File Updated Succesfully : ${response}`); // Success
    }, function (error) {
        console.log(`Failed In File Updating : ${error}`); // Failure
    });

}

function getFilePreview(fileId) {
    const client = new Client();
    const storage = new Storage(client);
    client
        .setEndpoint(conf.aw_URL)
        .setProject(conf.aw_ProjectId);
    ;
    const result = storage.getFilePreview(conf.aw_BucketId, fileId);
    console.log(`File Priview : ${result}`);
}

function createPost({ data }) {

        const client = new Client();
         
        const databases = new Databases(client);
        
        client
        .setEndpoint(conf.aw_URL)
        .setProject(conf.aw_ProjectId);
        ;
        
        const promise = databases.createDocument(conf.aw_DatabaseId, conf.aw_CollectionId, '123', {...data});
        
        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
}


function deleteFile(aw_BucketId, fileId) {
    const client = new Client();
    const storage = new Storage(client);

    client
        .setEndpoint(conf.aw_URL)
        .setProject(conf.aw_ProjectId);


    const promise = storage.deleteFile(aw_BucketId, fileId);

    promise.then(function (response) {
        console.log(`File Deleted Successfully :${response}`)

    }, function (error) {
        console.log(`Error In File Deletion :${error}`)

    });
}



const service = new Service();
export default service;
export { uploadFile, updateFile, getFilePreview, createPost, deleteFile };


