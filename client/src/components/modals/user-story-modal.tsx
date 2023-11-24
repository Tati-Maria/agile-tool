/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/modals/modal";
import { CreateUserStoryForm } from "@/components/forms/create-user-story-form";

import { useCreateUserStoryMutation } from "@/store/slices/user-story-api-slice";
import { transformStringToArray} from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserStory } from "@/lib/validation/user-story";

interface UserStoryModal {
    isOpen: boolean;
    isClose: () => void;
    projectId?: string;
}

export const UserStoryModal: React.FC<UserStoryModal> = ({isOpen, isClose, projectId}) => {
    const [createUserStory] = useCreateUserStoryMutation();
    const navigate = useNavigate();

    const onSubmit = async (values: UserStory) => {
        try {
            const res = await createUserStory({
                project: projectId as string,
                name: values.name,
                description: values.description,
                acceptanceCriteria: transformStringToArray(values.acceptanceCriteria as string),
                estimationPoints: values.estimationPoints,
            }).unwrap();
            console.log(res);
            toast.success(res.message);
            navigate(`/projects/${projectId}/user-stories`)
            isClose();
        } catch (error) {
            const {data} = error as any;
            const errors = data?.errors;
            toast.error(errors[0].message);
        }
    }

    return (
        <Modal
        isOpen={isOpen}
        onClose={isClose}
        title="Create User Story"
        >
            <CreateUserStoryForm 
            onSubmit={onSubmit}
            buttonText="Create User Story"
            projectId={projectId as string}
            />
        </Modal>
    )
};