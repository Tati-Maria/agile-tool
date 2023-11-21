import { useLoginUserMutation } from "@/store/slices/user-api-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginUser, {isLoading, isSuccess}] = useLoginUserMutation();

    async function login(data: {email: string, password: string}) {
        try {
            const user = await loginUser({
                email: data.email,
                password: data.password,
            }).unwrap();
            dispatch(setCredentials({...user}));
            toast.success("Successfully logged in!");
            navigate("/");
        } catch (error) {
            const err = error as {data: {message: string}};
            toast.error(err.data.message);
        }
    }

    return {login, isLoading, isSuccess};
};