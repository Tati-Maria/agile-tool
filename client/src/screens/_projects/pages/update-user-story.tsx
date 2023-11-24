import { CreateUserStoryForm } from '@/components/forms/create-user-story-form';
import { EmptyState, Heading, Loading } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { UserStory } from '@/lib/validation/user-story';
import {
  useGetUserStoryQuery,
  useUpdateUserStoryMutation,
  useDeleteUserStoryMutation,
} from '@/store/slices/user-story-api-slice';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { convertArrayToString, transformStringToArray } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteModal from '@/components/modals/delete-modal';

const UpdateUserStoryPage = () => {
  const { userStoryId } = useParams<{ userStoryId: string }>();
  const [showModal, setShowModal] = useState(false);
  const { data: userStory, isLoading } = useGetUserStoryQuery(userStoryId, {
    skip: !userStoryId,
  });
  const [updateUserStory] = useUpdateUserStoryMutation();
  const navigate = useNavigate();
  const [deleteUserStory, { isLoading: isDeleting }] =
    useDeleteUserStoryMutation();

  if (isLoading) {
    return <Loading />;
  } else if (!isLoading && !userStory) {
    return (
      <section className="h-full py-5">
        <EmptyState text="User Story not found" />
      </section>
    );
  }

  async function handleUpdateUserStory(values: UserStory) {
    try {
      const res = await updateUserStory({
        id: userStoryId,
        formData: {
          name: values.name,
          description: values.description,
          acceptanceCriteria: transformStringToArray(
            values.acceptanceCriteria as string
          ),
          estimationPoints: values.estimationPoints,
        },
      }).unwrap();
      toast.success(res.message);
    //   navigate(`/user-stories/${res._id}`);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  }

  //handle delete user story
  async function handleDeleteUserStory() {
    try {
      const res = await deleteUserStory(userStoryId).unwrap();
      toast.success(res.message);
      navigate(`/projects/${userStory.project}`);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  }

  const formattedUserStory = {
    name: userStory.name,
    description: userStory.description,
    acceptanceCriteria: convertArrayToString(userStory.acceptanceCriteria),
    estimationPoints: userStory.estimationPoints,
  } as UserStory;

  return (
    <>
      {showModal && (
        <DeleteModal
          title="Delete User Story"
          description="Are you sure you want to delete this user story? This action cannot be undone."
          isOpen={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={handleDeleteUserStory}
          isLoading={isDeleting}
        />
      )}
      <section className="h-full py-5">
        <div className="flex-between">
          <Heading level={2}>Update User Story</Heading>
          <Button onClick={() => setShowModal(true)} variant={'destructive'}>
            Delete User Story
          </Button>
        </div>
        <CreateUserStoryForm
          onSubmit={handleUpdateUserStory}
          values={formattedUserStory}
          buttonText="Update User Story"
          projectId={userStory.project}
        />
      </section>
    </>
  );
};

export default UpdateUserStoryPage;
