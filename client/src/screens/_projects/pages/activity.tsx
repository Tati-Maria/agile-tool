import ActivityList from '@/containers/activity-list';
import { useParams } from 'react-router-dom';

const ActivityPage = () => {
    const { projectId } = useParams<{ projectId: string }>();

    if(!projectId) return null;

  return (
    <section>
        <ActivityList projectId={projectId} />
    </section>
  );
};

export default ActivityPage;
