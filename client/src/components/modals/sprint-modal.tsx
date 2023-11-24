import { Modal } from './modal';
import { useCreateSprintMutation } from '@/store/slices/sprint-api-slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SprintSchema } from '@/lib/validation/sprint';
import { CreateSprintForm } from '../forms/create-sprint';

interface SprintModalProps {
  isOpen: boolean;
  isClose: () => void;
  projectId?: string;
}

const SprintModal = ({ isClose, isOpen, projectId }: SprintModalProps) => {
  const [createSprint] = useCreateSprintMutation();
  const navigate = useNavigate();

  const onSubmit = async (values: SprintSchema) => {
    try {
      const res = await createSprint({
        project: projectId as string,
        name: values.name,
        goal: values.goal,
        startDate: values.startDate,
        endDate: values.endDate,
      }).unwrap();
      toast.success(res.message);
      navigate(`/projects/${projectId}/sprints`);
      isClose();
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={isClose} title="Create Sprint">
      <CreateSprintForm onSubmit={onSubmit} buttonText="Create Sprint" />
    </Modal>
  );
};

export default SprintModal;
