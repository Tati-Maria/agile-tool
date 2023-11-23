import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { RootModal } from '@/components/modals/root-modal';
import { useGetProjectsQuery } from '@/store/slices/project-api-slice';
import { useNavigate } from 'react-router-dom';
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
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { data: projects, isLoading } = useGetProjectsQuery();

  useEffect(() => {
    if (projects?.length) {
      setIsOpen(false);
      navigate(`/projects/${projects[0]._id}`);
    }
  }, [projects, navigate]);

  return (
    <>
      <Outlet />
      {isOpen && !isLoading && (<RootModal isOpen={isOpen} onClose={() => {}} />)}
    </>
  );
};

export default ProjectLayout;
