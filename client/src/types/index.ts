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
    isActive: boolean;
    tasks: Task[];
    attachments: Attachments[];
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export type Task = {
    _id: string;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    assignedTo: User;
    comments: Comment[];
    sprint: Sprint;
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

enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export type UserStory = {
    _id: string;
    name: string;
    description: string | null;
    acceptanceCriteria: string[]
    estimationPoints: number;
    project: Project;
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
};

export type Sprint = {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    project: Project;
    goal: string;
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
}