import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { Heading, SprintList, Typography } from '@/components/shared';
import { useGetProjectSprintsQuery } from '@/store/slices/sprint-api-slice';
import SprintModal from '@/components/modals/sprint-modal';
import { Button } from '@/components/ui/button';

const SprintPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetProjectSprintsQuery(projectId as string);

  return (
    <>
      {showModal && (
        <SprintModal
          isClose={() => setShowModal(false)}
          isOpen={showModal}
          projectId={projectId}
        />
      )}
      <section className="h-full py-5">
        <div className="flex-between">
          <div className="space-y-1">
            <Heading className="text-xl md:text-2xl" level={2}>
              Sprints
            </Heading>
            <Typography className="text-muted-foreground">
              Manage your project sprints here and add tasks to them.
            </Typography>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            variant={"primary"}
          >
            Add Sprint
          </Button>
        </div>
        <SprintList
          sprints={data}
          isLoading={isLoading}
          projectId={projectId}
        />
      </section>
    </>
  );
};

export default SprintPage;
