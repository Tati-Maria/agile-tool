import {apiSlice} from "@/store/slices/api-slice";
import { User } from "@/types";

const USER_AP_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USER_AP_URL}/register`,
                method: "POST",
                body: data,
            })
        }),
        loginUser: builder.mutation({
            query: data => ({
                url: `${USER_AP_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: `${USER_AP_URL}/logout`,
                method: "POST",
            }),
        }),
        updateUser: builder.mutation<User, User>({
            query: (data) => ({
                url: `${USER_AP_URL}/profile`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation<void, void>({
            query: () => ({
                url: `${USER_AP_URL}/profile`,
                method: "DELETE",
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: `${USER_AP_URL}/profile`,
                method: "GET",
            })
        }),
        userForgotPassword: builder.mutation<void, string>({
            query: (data) => ({
                url: `${USER_AP_URL}/forgotpassword`,
                method: "POST",
                body: data,
            })
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserQuery,
    useUserForgotPasswordMutation,
} = userApiSlice;