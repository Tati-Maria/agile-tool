import { EmptyState, Loading } from '.';
import { Sprint } from '@/types';
import SprintCard from '@/components/cards/sprint-card';

interface SprintListProps {
  sprints: Sprint[] | undefined;
  isLoading: boolean;
  projectId: string | undefined;
}

const SprintList = ({ sprints, isLoading }: SprintListProps) => {
  return (
    <section className="h-full py-5">
      {isLoading && <Loading />}
      {!isLoading && sprints && sprints.length > 0 ? (
        <ul>
          {sprints.map((sprint) => (
            <SprintCard
            key={sprint._id}
            sprint={sprint} 
            />
          ))}
        </ul>
      ) : (
        <>
          <EmptyState text="No Sprints Found" desc="Add one to get started" />
        </>
      )}
    </section>
  );
};

export default SprintList;
