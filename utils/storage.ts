import { IPost } from "@/interfaces";
import { initialPosts } from "@/mocks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const POSTS_KEY = "user_posts";

export const StorageService = {
  addFirstTwoPosts: async () => {
    await AsyncStorage.setItem("user_posts", JSON.stringify(initialPosts));
  },

  getPosts: async (): Promise<IPost[]> => {
    try {
      const posts = await AsyncStorage.getItem(POSTS_KEY);
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error("Error getting posts:", error);
      return [];
    }
  },

  addPost: async (newPost: IPost) => {
    try {
      const posts = await StorageService.getPosts();
      posts.unshift(newPost);
      await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Error adding post:", error);
    }
  },

  clearPosts: async () => {
    await AsyncStorage.removeItem(POSTS_KEY);
  },
};
