import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { RootModal } from '@/components/modals/root-modal';
import { useGetProjectsQuery } from '@/store/slices/project-api-slice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
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
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { data: projects, isLoading } = useGetProjectsQuery();

  const currentUserProjects = projects?.filter(project => project.team?.map(member => member._id).includes(user?._id));

  useEffect(() => {
    if (isLoading) return;
    if (currentUserProjects?.length === 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      navigate(`/projects/${currentUserProjects?.[0]?._id}`);
    }
  }, [isLoading, currentUserProjects, navigate]);

  return (
    <>
      <Outlet />
      {isOpen && <RootModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProjectLayout;
