import { Modal } from '@/components/modals/modal';
import { Button } from '@/components/ui/button';
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
import { cn, convertBase64 } from '@/lib/utils';
import { CSSTransition} from 'react-transition-group';

interface RootModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RootModal = ({ isOpen, onClose }: RootModalProps) => {
  const navigate = useNavigate();
  const [openCreateProject, setOpenCreateProject] = useState(true);
  const [openJoinProject, setOpenJoinProject] = useState(false);
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const handleOpen = (type: 'create' | 'join') => {
    if (type === 'create') {
      setOpenCreateProject(true);
      setOpenJoinProject(false);
    } else {
      setOpenCreateProject(false);
      setOpenJoinProject(true);
    }
  };

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
        <div className={cn('flex flex-col space-y-4', !openCreateProject && "hidden")}>
          <DatePicker date={date} setDate={setDate} />
          <CreateProjectForm
            onSubmit={handleCreateProject}
            isLoading={isLoading}
            buttonText="Create Project"
          />
        </div>
      )}
      {openJoinProject && (
        <CSSTransition
          in={openJoinProject}
          timeout={300}
          classNames="slide-up"
          unmountOnExit
        >
          <JoinProjectForm />
        </CSSTransition>
      )}
      {/* Switch content buttons */}
      <div className="flex items-center space-x-4 mt-6 w-full justify-end">
        <Button
          type="button"
          variant={'brand'}
          size={'sm'}
          onClick={handleOpen.bind(null, 'create')}
        >
          Create Project
        </Button>
        <Button
          type="button"
          variant={'outline'}
          size={'sm'}
          onClick={handleOpen.bind(null, 'join')}
        >
          Join Project
        </Button>
      </div>
    </Modal>
  );
};
