import { useParams } from "react-router-dom";
import { useGetProjectQuery, useDeleteProjectMutation, useUpdateProjectMutation } from "@/store/slices/project-api-slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays} from "date-fns";
import { ProjectSchemaType } from "@/lib/validation/project";
import { toast } from "sonner";

import { CreateProjectForm } from "@/components/forms/create-project-form";
import { DatePicker } from "@/components/forms/date-picker";
import {EmptyState, Heading, Loading} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import DeleteModal from "@/components/modals/delete-modal";

export default function UpdateProjectPage() {
    const {projectId} = useParams<{projectId: string}>();
    const navigate = useNavigate();
    const {data: project, isLoading} = useGetProjectQuery(projectId, {skip: !projectId});
    const [updateProject, {isLoading: isUpdating}] = useUpdateProjectMutation();
    const [deleteProject, {isLoading: isDeleting}] = useDeleteProjectMutation();
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(project?.startDate || Date.now()),
        to: new Date(project?.endDate || addDays(Date.now(), 7))
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    

    if(!projectId) {
        navigate('/projects');
    } else if(isLoading) {
        <section className="h-full">
            <Loading />
        </section>
    } else if(!isLoading && !project) {
        return (
            <section className="h-full">
                <EmptyState 
                desc="Please select a project"
                text="Project not found" />
            </section>
        )
    }

    //handle update project
    async function handleUpdateProject(values: ProjectSchemaType) {
        try {
            const res = await updateProject({
                id: projectId,
                formData: {
                    name: values.name,
                    description: values.description,
                    startDate: date?.from,
                    endDate: date?.to
                }

            }).unwrap();
            console.log(res);
            toast.success('Project updated successfully');
            navigate(`/projects/${res._id}`);
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
        }
    }

    //handle delete project
    async function handleDeleteProject() {
        try {
            const res = await deleteProject(projectId).unwrap();
            console.log(res);
            toast.success(res.message);
            navigate('/projects');
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            toast.error(err.message);
        }
    }

    return (
      <>
      {isDeleteModalOpen && (
        <DeleteModal 
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        title={`Delete ${project?.name}`}
        description="Are you sure you want to delete this project?"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProject}
        />
      )}
        <section className="h-full">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between md:items-center">
            <Heading level={2} className="mb-4">
              Update Project
            </Heading>
            <Button variant={"destructive"} onClick={() => setIsDeleteModalOpen(true)}>
                Delete
                {isDeleting && (<Icons.spinner className="animate-spin ml-2 h-4 w-4" />)}
            </Button>
          </div>
          <div>
            <DatePicker date={date} setDate={setDate} />
            <CreateProjectForm
              buttonText="Update Project"
              onSubmit={handleUpdateProject}
              isLoading={isUpdating}
              values={project}
            />
          </div>
        </section>
      </>
    );
}