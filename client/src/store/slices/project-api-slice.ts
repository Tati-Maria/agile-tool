import { apiSlice } from "@/store/slices/api-slice";
import { Project } from "@/types";

const PROJECT_API_URL = "/api/projects";

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (body) => ({
                url: `${PROJECT_API_URL}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Project"],
        }),
        updateProject: builder.mutation({
            query: ({ id, formData }) => ({
                url: `${PROJECT_API_URL}/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Project"],
        }),
        getProjects: builder.query<Project[], void>({
            query: () => `${PROJECT_API_URL}`,
            providesTags: ["Project"],
        }),
        getProject: builder.query({
            query: (id) => `${PROJECT_API_URL}/${id}`,
            providesTags: ["Project", "Task", "Activity", "Attachment", "Sprint"],
        }),
        getTeam: builder.query({
            query: (id) => `${PROJECT_API_URL}/${id}/team`,
        }),
        onboardUser: builder.mutation({
            query: (formData) => ({
                url: `${PROJECT_API_URL}/onboard`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Project"],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `${PROJECT_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
        removeUserFromProject: builder.mutation({
            query: ({ id, userId }) => ({
                url: `${PROJECT_API_URL}/${id}/team/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
        makeProjectActiveOrInactive: builder.mutation({
            query: (id) => ({
                url: `${PROJECT_API_URL}/${id}/active`,
                method: "PATCH",
            }),
            invalidatesTags: ["Project"],
        }),
        generateAccessCode: builder.mutation({
            query: (id) => ({
                url: `${PROJECT_API_URL}/${id}/access-code`,
                method: "PATCH",
            }),
            invalidatesTags: ["Project"],
        }),
        getProjectActivityLog: builder.query({
            query: (id) => ({
                url: `${PROJECT_API_URL}/${id}/activity-log`,
                method: "GET",
            }),
            providesTags: ["Activity"],
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useGetProjectsQuery,
    useGetProjectQuery,
    useGetTeamQuery,
    useOnboardUserMutation,
    useDeleteProjectMutation,
    useRemoveUserFromProjectMutation,
    useMakeProjectActiveOrInactiveMutation,
    useGenerateAccessCodeMutation,
    useGetProjectActivityLogQuery,
} = projectApiSlice;