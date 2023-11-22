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
            href: `/projects/${projectId}/calendar`,
            label: 'Calendar'
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
        <div>
            <ProjectHeader 
            routes={routes}
            projectId={projectId}
            />
            <main className="max-w-[1450px] mx-auto px-4">
                <Outlet />
            </main>
        </div>
    )
};

export default ProjectIdLayout;