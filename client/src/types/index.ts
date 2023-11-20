export type RootProps = {
    children?: React.ReactNode;
} extends React.HTMLAttributes<HTMLElement> ? React.HTMLAttributes<HTMLElement> : never;

export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    avatarPublicId: string; // Cloudinary public ID
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export type Project = {
    id: string;
    title: string;
    description: string;
    logo: string;
    logoPublicId: string; // Cloudinary public ID
    status: ProjectStatus;
    manager: User;
    team: User[];
    startDate: string;
    tasks: Task[];
    documents: Document[];
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    project: Project;
    assignedTo: User;
    createdAt: string;
    updatedAt: string;
}

export type Document = {
    id: string;
    title: string;
    description: string;
    url: string;
    project: Project;
    createdAt: string;
    updatedAt: string;
}

export type Comment = {
    id: string;
    text: string;
    author: User;
    createdAt: string;
    updatedAt: string;
    attachments: Document[];
}

enum ProjectStatus {
    UNRELEASED = 'UNRELEASED',
    RELEASED = 'RELEASED',
    ARCHIVED = 'ARCHIVED'
}

enum Role {
    PROJECT_MANAGER = 'Project Manager',
    DEVELOPER = 'Developer',
    QA = 'QA',
    UX_UI_DESIGNER = 'UX/UI Designer',
    DEVOPS = 'DevOps',
    GUEST = 'Guest'
}

enum TaskStatus {
    TO_DO = 'To Do',
    IN_PROGRESS = 'In Progress',
    IN_REVIEW = 'In Review',
    DONE = 'Done'
}