import { useOnboardUserMutation } from "@/store/slices/project-api-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ProjectOnboardSchemaType } from "@/lib/validation/project";

export const useJoinProject = () => {
    const [onboardUser, { isLoading, error, isSuccess }] = useOnboardUserMutation();
    const navigate = useNavigate();

    async function joinProject(data: ProjectOnboardSchemaType) {
        try {
            const res = await onboardUser({ 
                accessCode: data.accessCode,
             }).unwrap();
            toast.success(res.message);
            navigate(`/projects/${res._id}`)
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