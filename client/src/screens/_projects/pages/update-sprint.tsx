import {
  useUpdateSprintMutation,
  useGetSprintByIdQuery,
  useDeleteSprintMutation,
} from '@/store/slices/sprint-api-slice';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, EmptyState, Loading } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SprintSchema } from '@/lib/validation/sprint';
import { CreateSprintForm } from '@/components/forms/create-sprint';
import { useState } from 'react';
import DeleteModal from '@/components/modals/delete-modal';
import { useSetDocumentTitle } from '@/hooks/user-document-title';

const UpdateSprintPage = () => {
  const { sprintId } = useParams<{ sprintId: string }>();
  const { data: sprint, isLoading } = useGetSprintByIdQuery(
    sprintId as string,
    { skip: !sprintId }
  );
  const navigate = useNavigate();
  const [updateSprint] = useUpdateSprintMutation();
  useSetDocumentTitle(`Update Sprint ${sprint?.name}`);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteSprint, { isLoading: isDeletingSprint }] =
    useDeleteSprintMutation();

  if (isLoading) {
    return (
      <section className="h-full py-5">
        <Loading />
      </section>
    );
  } else if (!sprint) {
    return (
      <section className="h-full py-5">
        <EmptyState text="No sprint found" />
      </section>
    );
  }

  //handle update sprint
  async function onSubmit(values: SprintSchema) {
    try {
      const res = await updateSprint({
        id: sprintId,
        formData: {
          name: values.name,
          goal: values.goal,
          startDate: values.startDate,
          endDate: values.endDate,
        },
      }).unwrap();
      toast.success(res.message);
      navigate(`/sprints/${sprintId}`);
    } catch (error) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  }

  //handle delete sprint
  async function handleDeleteSprint() {
    try {
      const res = await deleteSprint(sprintId).unwrap();
      toast.success(res.message);
      navigate(`/projects/${sprint?.project._id}`);
    } catch (error) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  }

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Sprint"
          description="Are you sure you want to delete this sprint?"
          isLoading={isDeletingSprint}
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteSprint}
        />
      )}
      <section className="h-full space-y-5 py-5">
        <Heading level={1}>{`Update Sprint ${sprint?.name}`}</Heading>
        <CreateSprintForm
          values={sprint}
          onSubmit={onSubmit}
          buttonText="Update Sprint"
        />
        <div className='mt-5'>
          <Button
            className="w-full sm:w-max"
            variant={'destructive'}
            size={'sm'}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Sprint
          </Button>
        </div>
      </section>
    </>
  );
};

export default UpdateSprintPage;
