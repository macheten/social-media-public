import { CommentDTO, PostDTO, SetReactionProps } from "@mytypes/types";
import { create } from "zustand";
import { FetchCommentsProps } from "../services/commentsService";
import { Api } from "../services";
import {
  createComment,
  CreateCommentProps,
} from "../app/actions/comments/create-comment";
import { deleteComment } from "../app/actions/comments/delete-comment";
import { SetPostReactionProps, usePostStore } from "./posts-state";
import { toggleReaction } from "../app/actions/toggle-reaction";
import { ReactionType } from "@prisma/client";


interface Store {
  comments: CommentDTO[];
  post: PostDTO;
  hasNextPage: boolean;
  nextCursor: string | null;
  isFetchingComments: boolean;
  fetchingPost: boolean;
  notFound: boolean;

  fetchComments: ({}: FetchCommentsProps) => Promise<void>;
  fetchPostById: (postId: string) => Promise<void>;
  setPost: (post: PostDTO) => void;
  createComment: ({}: CreateCommentProps) => Promise<void>;
  removeComment: (id: string) => Promise<void>;
  resetState: () => void;
  setPostReaction: ({}: SetPostReactionProps) => Promise<void>;
  setCommentReaction: ({}: SetReactionProps) => Promise<void>;
}

export const useCommentsState = create<Store>((set) => ({
  comments: [],
  hasNextPage: true,
  nextCursor: null,
  isFetchingComments: true,
  post: {} as PostDTO,
  fetchingPost: true,
  notFound: false,

  async setCommentReaction({ id, type }) {
    const res = await toggleReaction({
      type, commentId: id
    })
    set(state => ({
      comments: state.comments.map(c => {
        return c.id === id ? { ...c, reactions: res.reactions } : c
      })
    }))
  },

  setPost(post) {
    set({ post });
  },

  async setPostReaction(data) {
    const res = await toggleReaction(data);
    set((state) => ({ post: { ...state.post, reactions: res.reactions } }));
  },

  async fetchPostById(postId) {
    try {
      set({ fetchingPost: true, notFound: false });
      const { post } = await Api.posts.getPost(postId);
      set({ post });
    } catch (error) {
      set({ notFound: true });
    } finally {
      set({ fetchingPost: false });
    }
  },

  async fetchComments(data) {
    set({ isFetchingComments: true });
    const { comments, hasNextPage, nextCursor } =
      await Api.comments.fetchComments(data);
    set((state) => ({
      comments: [...state.comments, ...comments],
      isFetchingComments: false,
      hasNextPage,
      nextCursor,
    }));
  },

  async createComment(data) {
    const { comment } = await createComment(data);
    set((state) => ({
      comments: [comment, ...state.comments],
      post: { ...state.post, commentsCount: state.post.commentsCount + 1 },
    }));
    usePostStore.getState().updateCommentsCount(data.postId, "inc");
  },

  async removeComment(id) {
    const { deletedComment } = await deleteComment(id);
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
      post: { ...state.post, commentsCount: state.post.commentsCount - 1 },
    }));
    if (deletedComment) {
      usePostStore.getState().updateCommentsCount(deletedComment.postId, "dec");
    }
  },

  resetState() {
    set({
      post: {} as PostDTO,
      fetchingPost: true,
      comments: [],
      hasNextPage: true,
      nextCursor: null,
      isFetchingComments: true,
    });
  },
}));
