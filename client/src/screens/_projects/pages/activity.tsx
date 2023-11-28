import ActivityList from '@/containers/activity-list';
import { useParams } from 'react-router-dom';
import { useSetDocumentTitle } from '@/hooks/user-document-title';

const ActivityPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    useSetDocumentTitle(`Activity`);
    
    if(!projectId) return null;

  return (
    <section>
        <ActivityList projectId={projectId} />
    </section>
  );
};

export default ActivityPage;
