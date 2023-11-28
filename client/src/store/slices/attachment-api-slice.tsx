import { apiSlice } from "./api-slice";
import { Attachment } from "@/types";

const ATTACHMENT_API_URL = "/api/attachments";

export const attachmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAttachment: builder.mutation<Attachment, Attachment>({
            query: (data) => ({
                url: ATTACHMENT_API_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Attachment", "Project"],
        }),
        getAttachment: builder.query<Attachment, string>({
            query: (id) => `${ATTACHMENT_API_URL}/${id}`,
            providesTags: ["Attachment"],
        }),
        deleteAttachment: builder.mutation<string, string>({
            query: (id) => ({
                url: `${ATTACHMENT_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Attachment", "Project"],
        }),
        getProjectAttachments: builder.query<Attachment[], string>({
            query: (projectId) => ({
                url: `${ATTACHMENT_API_URL}/${projectId}`,
                method: "GET",
            })
        }),
        updateAttachment: builder.mutation<Attachment, Attachment>({
            query: (data) => ({
                url: `${ATTACHMENT_API_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Attachment", "Project"],
        }),
    }),
});

export const {
    useCreateAttachmentMutation,
    useGetAttachmentQuery,
    useDeleteAttachmentMutation,
    useGetProjectAttachmentsQuery,
    useUpdateAttachmentMutation,
} = attachmentApiSlice;