import { useOnboardUserMutation } from "@/store/slices/project-api-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useJoinProject = () => {
    const [onboardUser, { isLoading, error, isSuccess }] = useOnboardUserMutation();
    const navigate = useNavigate();

    async function joinProject(accessCode: string) {
        try {
            const res = await onboardUser({ 
                accessCode
             }).unwrap();
            toast.success(res.message);
            navigate(`/projects/${res.projectId}`)
        } catch (error) {
            const errorMessage = error as string;
            toast.error(errorMessage);
        }
    }

    return {
        joinProject,
        isLoading,
        error,
        isSuccess
    };
};