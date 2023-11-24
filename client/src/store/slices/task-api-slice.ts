import {apiSlice} from "@/store/slices/api-slice";
import { Task } from "@/types";

const TASK_API_URL = "/api/tasks";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (formData) => ({
                url: `${TASK_API_URL}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Task"]
        }),
        updateTask: builder.mutation({
            query: ({id, formData}) => ({
                url: `${TASK_API_URL}/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `${TASK_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"]
        }),
        getTaskById: builder.query<Task, string>({
            query: (id) => `${TASK_API_URL}/${id}`,
        }),
        getTasks: builder.query<Task[], void>({
            query: () => `${TASK_API_URL}`,
        }),
        updateTaskStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `${TASK_API_URL}/${id}/status`,
                method: "PATCH",
                body: {status},
            }),
            invalidatesTags: ["Task"]
        }),
        searchTasks: builder.query({
            query: ({query}) => `${TASK_API_URL}/search?query=${query}`,
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetTaskByIdQuery,
    useGetTasksQuery,
    useUpdateTaskStatusMutation,
    useSearchTasksQuery,
} = taskApiSlice;