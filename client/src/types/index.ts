export type RootProps = {
    children?: React.ReactNode;
} extends React.HTMLAttributes<HTMLElement> ? React.HTMLAttributes<HTMLElement> : never;

export type User = {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
    avatarPublicId: string; // Cloudinary public ID
    role: string;
    createdAt: string;
    updatedAt: string;
}

export type Project = {
    _id: string;
    name: string;
    description: string;
    logo: string;
    logoPublicId: string; // Cloudinary public ID
    owner: User;
    team: User[];
    startDate: string;
    tasks: Task[];
    attachments: Attachments[];
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

export type Attachments = {
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

enum TaskStatus {
    TO_DO = 'To Do',
    IN_PROGRESS = 'In Progress',
    IN_REVIEW = 'In Review',
    DONE = 'Done'
}