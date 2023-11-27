import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "@/store/slices/project-api-slice";
import { EmptyState, Loading, Heading, Typography } from "@/components/shared";
import GenerateNewCodeForm from "@/components/forms/generate-new-code";
import { useSetDocumentTitle } from "@/hooks/user-document-title";

const SettingsPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: project, isLoading } = useGetProjectQuery(projectId, { skip: !projectId });
    useSetDocumentTitle(`${project?.name} Settings`)

    if (isLoading) {
        return (
            <Loading />
        )
    } else if (!isLoading && !project) {
        return (
            <EmptyState text="Project not found" />
        )
    } else if (!projectId) {
        return (
            <EmptyState text="Please select a project" />
        )
    }

  return (
    <section className="h-full py-3">
        <Heading className="text-xl md:text-2xl mb-1" level={2}>
            {project.name} Settings
        </Heading>
        <Typography className="text-muted-foreground">
            {`Manage your project settings here. You can change the project name, description, and access code.`}
        </Typography>
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2">
            <GenerateNewCodeForm projectId={projectId} accessCode={project.accessCode} />
            {/* Project Name edit */}
            {/* Project Description edit */}
            {/* Project Start Date edit */}
            {/* Project End Date edit */}
            {/* Project Logo edit */}
            {/** Project Archive */}
        </section>
    </section>
  )
}

export default SettingsPage