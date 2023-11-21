/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserForgotPasswordMutation } from "@/store/slices/user-api-slice";
import { toast } from "sonner";
import { ForgotPasswordSchema } from "@/lib/validation/user";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
    const navigate = useNavigate();
    const [forgotPassword, {isLoading, isSuccess}] = useUserForgotPasswordMutation();

    async function forgot(data: ForgotPasswordSchema) {
        try {
            await forgotPassword({
                email: data.email,
                password: data.password,
            }).unwrap();
            toast.success("Successfully changed password!");
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return {forgot, isLoading, isSuccess};
};