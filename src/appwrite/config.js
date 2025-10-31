import { Client, Databases, Storage, ID } from "appwrite";
import config from "../config/config";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Upload file
  async uploadFile(file) {
    return await this.storage.createFile(config.appwriteBucketId, ID.unique(), file);
  }

  // Delete file
  async deleteFile(fileId) {
    if (!fileId) return;
    return await this.storage.deleteFile(config.appwriteBucketId, fileId);
  }

  // get file preview
getFilePreview(fileId) {
  if (!fileId) return "";
  return `https://cloud.appwrite.io/v1/storage/buckets/${config.appwriteBucketId}/files/${fileId}/view?project=${config.appwriteProjectId}`;
}



  // Create Post
  async createPost({ title, content, imageFile, status, userid }) {
    try {
      const uploadedFile = await this.uploadFile(imageFile);

      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          status,
          featuredimage: uploadedFile.$id,
          userid,
          slug: title
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "")
            .replace(/\s+/g, "-"),
        }
      );
    } catch (error) {
      console.error("appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  //  Update Post
  async updatePost(postId, { title, content, status, imageFile }) {
    try {
      let featuredimage = null;

      if (imageFile) {
        const uploadedFile = await this.uploadFile(imageFile);
        featuredimage = uploadedFile.$id;
      }

      const updateData = {
        title,
        content,
        status,
      };

      if (featuredimage) updateData.featuredimage = featuredimage;

      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId,
        updateData
      );
    } catch (error) {
      console.error("appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  //  Get All Posts
  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  //  Get Single Post by ID
  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.error("appwrite service :: getPost :: error", error);
      return false;
    }
  }

  //  Delete Post
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.error("appwrite service :: deletePost :: error", error);
      return false;
    }
  }
}

const appwriteService = new Service();
export default appwriteService;
