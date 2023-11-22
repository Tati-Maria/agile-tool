import { Modal } from '@/components/modals/modal';
import { useCreateProjectMutation } from '@/store/slices/project-api-slice';
import { DatePicker } from '@/components/forms/date-picker';
import { CreateProjectForm } from '@/components/forms/create-project-form';
import { JoinProjectForm } from '@/components/forms/join-project';

import { useState} from 'react';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { ProjectSchemaType } from '@/lib/validation/project';
import { useNavigate } from 'react-router-dom';
import { convertBase64 } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface RootModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RootModal = ({ isOpen, onClose }: RootModalProps) => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [createProject, { isLoading }] = useCreateProjectMutation();
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
      {user.role === "Product Owner" && (
        <div className='mt-2'>
          <DatePicker 
          date={date}
          setDate={setDate}
          />
          <CreateProjectForm 
          onSubmit={handleCreateProject}
          isLoading={isLoading}
          buttonText='Create Project'
          />
        </div>
      )}
      {user.role !== "Product Owner" && (
        <JoinProjectForm onClose={onClose} />
      )}
    </Modal>
  );
};
