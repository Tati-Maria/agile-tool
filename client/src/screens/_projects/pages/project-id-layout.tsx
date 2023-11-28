import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import {ProjectHeader} from "@/components/shared";

const ProjectIdLayout = () => {
    const { projectId } = useParams<{projectId: string}>();

    const routes = [
        {
            href: `/projects/${projectId}`,
            label: 'Overview',
            icon: "/icons/dashboard.png"
        },
        {
            href: `/projects/${projectId}/sprints`,
            label: 'Sprints',
            icon: "/icons/sprint.png"
        },
        {
            href: `/projects/${projectId}/tasks`,
            label: 'Tasks',
            icon: "/icons/done.png"
        },
        {
            href: `/projects/${projectId}/activity`,
            label: 'Activity',
            icon: "/icons/activity.png"
        },
        {
            href: `/projects/${projectId}/team`,
            label: 'Members',
            icon: "/icons/friends.png"
        },
        {
            href: `/projects/${projectId}/settings`,
            label: 'Settings',
            icon: "/icons/setting.png"
        }
    ];

    return (
        <div className="h-full">
            <ProjectHeader 
            routes={routes}
            projectId={projectId}
            />
            <main className="max-w-[1450px] mx-auto px-4 py-5 h-full">
                <Outlet />
            </main>
        </div>
    )
};

export default ProjectIdLayout;