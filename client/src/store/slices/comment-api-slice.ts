import { apiSlice } from './api-slice';

const COMMENT_API_URL = '/api/comments';

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation({
      query: body => ({
        url: COMMENT_API_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `${COMMENT_API_URL}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Comment', 'Task'],
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `${COMMENT_API_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
    getTaskComments: builder.query({
      query: id => `${COMMENT_API_URL}/task/${id}`,
      providesTags: ['Comment'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetTaskCommentsQuery,
} = commentApiSlice;
