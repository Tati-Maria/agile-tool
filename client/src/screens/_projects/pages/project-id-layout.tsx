import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import {ProjectHeader} from "@/components/shared";

const ProjectIdLayout = () => {
    const { projectId } = useParams<{projectId: string}>();

    const routes = [
        {
            href: `/projects/${projectId}`,
            label: 'Overview'
        },
        {
            href: `/projects/${projectId}/user-stories`,
            label: 'User Stories'
        },
        {
            href: `/projects/${projectId}/sprints`,
            label: 'Sprints'
        },
        {
            href: `/projects/${projectId}/tasks`,
            label: 'Tasks'
        },
        {
            href: `/projects/${projectId}/files`,
            label: 'Files'
        },
        {
            href: `/projects/${projectId}/activity`,
            label: 'Activity'
        },
        {
            href: `/projects/${projectId}/team`,
            label: 'Members'
        },
        {
            href: `/projects/${projectId}/settings`,
            label: 'Settings'
        },
    ];

    return (
        <div className="h-full">
            <ProjectHeader 
            routes={routes}
            projectId={projectId}
            />
            <main className="max-w-[1450px] mx-auto px-4 h-full">
                <Outlet />
                {/* Project Activity Logs */}
            </main>
        </div>
    )
};

export default ProjectIdLayout;