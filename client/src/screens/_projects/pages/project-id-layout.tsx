import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProjectIdLayout = () => {
    const { projectId } = useParams<{projectId: string}>();

    return (
        <div>
            {/* <ProjectHeader /> */}
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default ProjectIdLayout;