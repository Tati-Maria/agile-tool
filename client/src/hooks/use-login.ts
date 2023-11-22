import { useLoginUserMutation } from "@/store/slices/user-api-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/lib/validation/user";

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginUser, {isLoading, isSuccess}] = useLoginUserMutation();

    async function login(data: LoginSchema) {
        try {
            const res = await loginUser({
                email: data.email,
                password: data.password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Successfully logged in!");
            navigate("/projects");
        } catch (error) {
            const err = error as {message: string};
            toast.error(err.message);
        }
    }

    return {login, isLoading, isSuccess};
};