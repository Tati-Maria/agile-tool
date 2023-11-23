import { Heading } from "@/components/shared"
import ProjectList from "@/containers/project-list"


const ProjectsPage = () => {
  return (
    <section className="h-full">
        <Heading className="mb-4" level={1}>Projects</Heading>
        <ProjectList />
    </section>
  )
}

export default ProjectsPage