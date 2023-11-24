import ProjectNav from "@/components/project-table/project-nav";
import { Heading } from "@/components/shared"
import { Button } from "@/components/ui/button";
import ProjectList from "@/containers/project-list"
import { useAuth } from "@/hooks/use-auth";
import { RootModal } from '@/components/modals/root-modal';
import { useState } from "react";


const ProjectsPage = () => {
  const { user } = useAuth();
    const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
    {openModal && (
      <RootModal 
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      />
    )}
      <section className="h-full max-w-7xl mx-auto px-2">
        <ProjectNav />
        <div className="flex-between my-10">
          <Heading className="mb-4 text-xl md:text-2xl ml-4" level={1}>
            Projects
          </Heading>
          <Button onClick={() => setOpenModal(true)} variant={'outline'}>
            {user?.role === 'Product Owner' ? 'Create Project' : 'Join Project'}
          </Button>
        </div>
        <ProjectList />
      </section>
    </>
  );
}

export default ProjectsPage