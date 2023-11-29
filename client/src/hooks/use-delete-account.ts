import { useDeleteUserMutation } from "@/store/slices/user-api-slice";
import { clearCredentials } from "@/store/slices/auth-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export const useDeleteAccount = () => {
    const [deleteUser, {isLoading}] = useDeleteUserMutation();
    const dispatch = useDispatch();

    const handleDeleteAccount = async () => {
        try {
            await deleteUser().unwrap();
            toast.success("Thanks for using our service! We hope to see you again soon!")
            dispatch(clearCredentials());
        } catch (error) {
            const errorMessage = error as string;
            toast.error(errorMessage);
        }
    };

    return {handleDeleteAccount, isLoading};
};