import { Sprint } from "@/types";
import { apiSlice } from "./api-slice";

const SPRINT_API_URL = "/api/sprints";

export const sprintApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSprint: builder.mutation({
            query: (formData) => ({
                url: `${SPRINT_API_URL}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Sprint"]
        }),
        updateSprint: builder.mutation({
            query: ({id, formData}) => ({
                url: `${SPRINT_API_URL}/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Sprint"]
        }),
        deleteSprint: builder.mutation({
            query: (id) => ({
                url: `${SPRINT_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sprint"]
        }),
        getSprintById: builder.query<Sprint, string>({
            query: (id) => `${SPRINT_API_URL}/${id}`,
            providesTags: ["Sprint", "Task"],
        }),
        getProjectSprints: builder.query<Sprint[], string>({
            query: (projectId) => `${SPRINT_API_URL}/project/${projectId}`,
            providesTags: ["Sprint"],
        }),
        addTaskToSprint: builder.mutation({
            query: ({sprintId, formData}) => ({
                url: `${SPRINT_API_URL}/${sprintId}/add-task`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Sprint", "Task"],
        }),
        removeTaskToSprint: builder.mutation({
            query: ({sprintId, formData}) => ({
                url: `${SPRINT_API_URL}/${sprintId}/remove-task`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Sprint", "Task"],
        }),
    }),
});

export const {
    useCreateSprintMutation,
    useUpdateSprintMutation,
    useDeleteSprintMutation,
    useGetSprintByIdQuery,
    useGetProjectSprintsQuery,
    useAddTaskToSprintMutation,
    useRemoveTaskToSprintMutation,
} = sprintApiSlice;