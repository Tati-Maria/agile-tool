import { ProjectOnboardSchemaType } from "@/lib/validation/project";
import { useOnboardUserMutation } from "@/store/slices/project-api-slice";
import { toast } from "sonner";

export const useJoinProject = () => {
    const [onboardUser, { isLoading, error, isSuccess }] = useOnboardUserMutation();

    async function joinProject(accessCode: ProjectOnboardSchemaType) {
        try {
            const res = await onboardUser({ accessCode }).unwrap();
            toast.promise(res, {
                loading: 'Joining project...',
                success: 'Successfully joined project',
                error: 'Failed to join project'
            });
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