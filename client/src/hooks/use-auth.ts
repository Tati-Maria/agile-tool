import { User } from "@/types";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const {user} = useSelector((state: {auth: {user: User}}) => state.auth);

    return {user};
}