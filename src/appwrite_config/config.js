const conf = {
  aw_URL: String(import.meta.env.VITE_APPWRITE_URL),
  aw_ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  aw_DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  aw_CollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  aw_BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
