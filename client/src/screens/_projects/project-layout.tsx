import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { RootModal } from "@/components/modals/root-modal";
import { useGetProjectsQuery } from "@/store/slices/project-api-slice";
import { useAuth } from "@/hooks/use-auth";
import { useSetDocumentTitle } from "@/hooks/user-document-title";

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
    const { data: projects, isLoading } = useGetProjectsQuery(null, { skip: !user });
    console.log({ projects });

    useEffect(() => {
        if (isLoading) return;
        if (projects?.length === 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [isLoading, projects]);

  return (
    <>
      {user && projects?.length > 0 ? (
        <Navigate 
        to={`/projects/${projects[0]?._id}`} 
        />
      ) : (
        <RootModal 
        isOpen={isOpen} 
        onClose={() => {}}
        />
      )}
    </>
  )
}

export default ProjectLayout