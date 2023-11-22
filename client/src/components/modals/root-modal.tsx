import { useState } from "react";
import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/ui/button";
import { useCreateProjectMutation } from "@/store/slices/project-api-slice";
import { toast } from "sonner";
import { DatePicker } from "@/components/forms/date-picker";
import { CreateProjectForm } from "@/components/forms/create-project-form";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { ProjectSchemaType } from "@/lib/validation/project";
import { useNavigate } from "react-router-dom";
import { convertBase64 } from "@/lib/utils";

interface RootModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RootModal = ({isOpen, onClose}: RootModalProps) => {
    const navigate = useNavigate();
    const [openCreateProject, setOpenCreateProject] = useState(false);
    const [openJoinProject, setOpenJoinProject] = useState(false);
    const [createProject, {isLoading}] = useCreateProjectMutation();
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    });

    async function handleCreateProject(data: ProjectSchemaType) {
        try {
            const res = await createProject({
                name: data.name,
                description: data.description,
                logo: await convertBase64(data?.logo?.[0] as File),
                startDate: date?.from,
                endDate: date?.to,
            }).unwrap();
            onClose();
            toast.success(`Project ${res.name} created!`);
            navigate(`/projects/${res.id}`);
        } catch (error) {
            const errorMessage = error as string;
            toast.error(errorMessage);
        }
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Get Started"
        description="Create a new project or select an existing one to get started."
      >
        {/* Content */}
        {openCreateProject && (
          <>
          <DatePicker 
          date={date}
          setDate={setDate}
          />
            <CreateProjectForm
              onSubmit={handleCreateProject}
              isLoading={isLoading}
              buttonText="Create Project"
            />
          </>
        )}
        {openJoinProject && <div>Join Project</div>}
        {/* Switch content buttons */}
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant={'brand'}
            size={'sm'}
            onClick={() => setOpenCreateProject(true)}
          >
            Create Project
          </Button>
          <Button
            type="button"
            variant={'outline'}
            size={'sm'}
            onClick={() => setOpenJoinProject(true)}
          >
            Join Project
          </Button>
        </div>
      </Modal>
    );
};