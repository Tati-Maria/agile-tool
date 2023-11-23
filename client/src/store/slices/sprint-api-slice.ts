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
        }),
        getProjectSprints: builder.query<Sprint[], string>({
            query: (projectId) => `${SPRINT_API_URL}/project/${projectId}`,
        }),
    }),
});

export const {
    useCreateSprintMutation,
    useUpdateSprintMutation,
    useDeleteSprintMutation,
    useGetSprintByIdQuery,
    useGetProjectSprintsQuery,
} = sprintApiSlice;