import {apiSlice} from "@/store/slices/api-slice";

const USER_STORY_API_URL = "/api/user-stories";

export const userStoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUserStory: builder.mutation({
            query: (formData) => ({
                url: `${USER_STORY_API_URL}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["UserStory"],
        }),
        updateUserStory: builder.mutation({
            query: ({id, formData}) => ({
                url: `${USER_STORY_API_URL}/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["UserStory"],
        }),
        deleteUserStory: builder.mutation({
            query: (id) => ({
                url: `${USER_STORY_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["UserStory"],
        }),
        getUserStory: builder.query({
            query: (id) => `${USER_STORY_API_URL}/${id}`,
            providesTags: ["UserStory"],
        }),
        getProjectUserStories: builder.query({
            query: (projectId) => `${USER_STORY_API_URL}/project/${projectId}`,
            providesTags: ["UserStory"],
        }),
        searchUserStories: builder.query({
            query: ({projectId, searchTerm}) => ({
                url: `${USER_STORY_API_URL}/search`,
                params: {
                    projectId,
                    searchTerm,
                },
            }),
            providesTags: ["UserStory"],
        }),
        addTaskToUserStory: builder.mutation({
            query: ({userStoryId, formData}) => ({
                url: `${USER_STORY_API_URL}/${userStoryId}/add-task`,
                method: "PATCH",
                body: formData,
            })
        }),
    }),
});

export const {
    useCreateUserStoryMutation,
    useUpdateUserStoryMutation,
    useDeleteUserStoryMutation,
    useGetUserStoryQuery,
    useGetProjectUserStoriesQuery,
    useSearchUserStoriesQuery,
    useAddTaskToUserStoryMutation,
} = userStoryApiSlice;