import { Outlet } from 'react-router-dom';
import { useSetDocumentTitle } from '@/hooks/user-document-title';

/*
===== How it supposed to work =====
1. Check if the current user has any projects
2. if not keep the modal open, till the user creates a project
3. if yes redirect to the first project
4. the user cannot close the if he has no projects
 */

const ProjectLayout = () => {
  useSetDocumentTitle('Projects');
 
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProjectLayout;
