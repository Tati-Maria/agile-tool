import { useParams } from "react-router-dom";

import { Heading, SprintList, Typography } from "@/components/shared"
import { useGetProjectSprintsQuery } from "@/store/slices/sprint-api-slice";

const SprintPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {data, isLoading} = useGetProjectSprintsQuery(projectId as string);

  return (
    <section>
      <div>
        <Heading level={2}>
          Sprints
        </Heading>
        <Typography>
            Manage your project sprints here and add tasks to them.
        </Typography>
      </div>
      <SprintList sprints={data} isLoading={isLoading} projectId={projectId} />
    </section>
  );
}

export default SprintPage