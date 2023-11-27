import { useRegisterUserMutation } from "@/store/slices/user-api-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth-slice";
import { UserSchema } from "@/lib/validation/user";
import { useNavigate } from "react-router-dom";
import { convertBase64 } from "@/lib/utils";

export const useRegister = () => {
    const [registerUser, {isLoading, isSuccess}] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function register(data: UserSchema) {
        try {
            const res = await registerUser({
                email: data.email,
                password: data.password,
                name: data.name,
                avatar: await convertBase64(data.avatar[0]),
                role: data.role,
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Successfully registered!");
            navigate("/projects");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return {register, isLoading, isSuccess};
}