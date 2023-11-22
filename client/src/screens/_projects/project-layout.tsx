import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { RootModal } from "@/components/modals/root-modal";
import { useGetProjectsQuery } from "@/store/slices/project-api-slice";
import { useAuth } from "@/hooks/use-auth";
import { useSetDocumentTitle } from "@/hooks/user-document-title";

/*
===== How it supposed to work =====
1. Check if the current user has any projects
2. If not, show the RootModal
3. If yes, show the ProjectList
 */

const ProjectLayout = () => {
    useSetDocumentTitle('Projects');
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const { data: projects, isLoading } = useGetProjectsQuery(null, { skip: !user });

    useEffect(() => {
        if (!isLoading && projects.length === 0) {
            setIsOpen(true);
        }
    }, [isLoading, projects]);

  return (
    <>
      {user && projects.length > 0 ? (
        <Navigate 
        to={`/projects/${projects[0]?._id}`} 
        />
      ) : (
        <RootModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}

export default ProjectLayout