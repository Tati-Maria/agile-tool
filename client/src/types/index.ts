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
    startDate: string;
    endDate: string;
    isActive: boolean;
    logo: string;
    logoPublicId: string; // Cloudinary public ID
    accessCode: string;
    team: User[];
    owner: User;
    sprints: Sprint[];
    attachments: Attachments[];
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
    activityLog: ActivityLog[];
}

export type Task = {
    _id: string;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    type: TaskType;
    resolution: TaskResolution | null; // It's not required because it's only used when the task is closed
    sprint: Sprint;
    assignedTo: User;
    projectId: string;
    createdBy: User;
    attachments: Attachments[] | null;
    comments: Comment[];
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
}

export type Attachments = {
    _id: string;
    title: string;
    description: string;
    url: string;
    project: Project;
    createdAt: string;
    updatedAt: string;
}

export type Comment = {
    _id: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt: string;
    task: Task;
}

enum TaskStatus {
  BACKLOG = 'Backlog',
  TODO = 'To Do',
  INPROGRESS = 'In Progress',
  TESTING = 'Testing',
  DONE = 'Done',
  PAUSED = 'Paused',
}

enum TaskPriority {
  LOW = 'Low',
  NORMAL = 'Normal',
  HIGH = 'High',
  URGENT = 'Urgent',
}

enum TaskType {
  BUG = 'Bug',
  FEATURE = 'Feature',
  IMPROVEMENT = 'Improvement',
  REFACTOR = 'Refactor',
  TEST = 'Test',
  OTHER = 'Other',
}

enum TaskResolution {
  FIXED = 'Fixed',
  DUPLICATE = 'Duplicate',
  INVALID = 'Invalid',
  WONTFIX = "Won't Fix",
  WORKSFORME = 'Works For Me',
  UNRESOLVED = 'Unresolved',
  OTHER = 'Other',
}


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

export type ActivityLog = {
    _id: string;
    user: User;
    action: ActivityAction;
    details: string;
    entity: ActivityEntity;
    entityId: string;
    projectId: Project;
    timestamp: string;
}

enum ActivityAction {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    JOIN = 'JOIN',
    LEAVE = 'LEAVE',
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    UPLOAD = 'UPLOAD',
    COMPLETE = 'COMPLETE',
    ARCHIVE = 'ARCHIVE'
}

enum ActivityEntity {
    TASK = 'TASK',
    SPRINT = 'SPRINT',
    PROJECT = 'PROJECT',
}
