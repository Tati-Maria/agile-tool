import { useRegisterUserMutation } from "@/store/slices/user-api-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth-slice";
import { UserSchema } from "@/lib/validation/user";

const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });

}

export const useRegister = () => {
    const [registerUser, {isLoading, isSuccess}] = useRegisterUserMutation();
    const dispatch = useDispatch();

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
        } catch (error) {
            const err = error as {data: {message: string}};
            toast.error(err.data.message);
        }
    }

    return {register, isLoading, isSuccess};
}