import { clearCredentials } from "@/store/slices/auth-slice";
import { useLogoutUserMutation } from "@/store/slices/user-api-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export const useUserLogout = () => {
    const dispatch = useDispatch();
    const [logoutUser, {isLoading, isSuccess}] = useLogoutUserMutation();

    async function logout() {
        try {
            await logoutUser().unwrap();
            dispatch(clearCredentials());
            toast.success("Successfully logged out! See you soon!");
        } catch (error) {
            const err = error as {data: {message: string}};
            toast.error(err.data.message);
        }
    }

    return {logout, isLoading, isSuccess};
}