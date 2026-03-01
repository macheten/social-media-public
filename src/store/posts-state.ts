import { create } from "zustand";
import { Api } from "../services";
import {
  createPost,
  CreatePostProps,
} from "../app/actions/profile/create-post";
import { FetchPostsProps } from "../services/postsService";
import { deletePost } from "../app/actions/profile/delete-post";
import {
  updatePost,
  UpdatePostProps,
} from "../app/actions/profile/update-post";
import { PostDTO, SetReactionProps } from "@mytypes/types";
import { ReactionType } from "@prisma/client";
import { toggleReaction } from "../app/actions/toggle-reaction";

export interface SetPostReactionProps {
  type: ReactionType;
  postId: string;
}

interface Store {
  posts: PostDTO[];
  hasNextPage: boolean;
  endCursor: string | null;
  fetchingPosts: boolean;

  fetchPosts: ({}: FetchPostsProps) => Promise<void>;
  resetState: () => void;
  addPost: ({}: CreatePostProps) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  editPost: ({}: UpdatePostProps) => Promise<void>;
  updateCommentsCount: (postId: string, type: "inc" | "dec") => void;
  setReaction: ({}: SetReactionProps) => Promise<void>;
}

export const usePostStore = create<Store>((set) => ({
  posts: [] as PostDTO[],
  hasNextPage: true,
  endCursor: null,
  fetchingPosts: false,

  updateCommentsCount(postId, type) {
    const value = type === "dec" ? -1 : 1;
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id === postId) {
          return { ...p, commentsCount: p.commentsCount + value };
        }
        return p;
      }),
    }));
  },

  async fetchPosts(data) {
    try {
      set({ fetchingPosts: true });
      const { endCursor, hasNextPage, posts } =
        await Api.posts.fetchPosts(data);
      set((state) => ({
        endCursor,
        hasNextPage,
        posts: [...state.posts, ...posts],
      }));
    } catch (error) {
      console.error("FETCH POSTS error", error);
    } finally {
      set({ fetchingPosts: false });
    }
  },

  resetState() {
    set({
      endCursor: null,
      hasNextPage: true,
      posts: [],
      fetchingPosts: false,
    });
  },

  async addPost(data) {
    try {
      const { post } = await createPost(data);
      set((state) => ({ posts: [post!, ...state.posts] }));
    } catch (error) {
      throw error;
    }
  },

  async deletePost(postId) {
    try {
      await deletePost(postId);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      throw error;
    }
  },

  async editPost(data) {
    try {
      await updatePost(data);
      set((state) => ({
        posts: state.posts.map((post) => {
          return post.id === data.postId
            ? { ...post, content: data.content, title: data.title }
            : post;
        }),
      }));
    } catch (error) {
      throw error;
    }
  },

  async setReaction({ id, type }) {
    const res = await toggleReaction({
      type, postId: id
    });
    set((state) => ({
      posts: state.posts.map((post) => {
        return post.id === id
          ? { ...post, reactions: res.reactions }
          : post;
      }),
    }));
  },
}));
