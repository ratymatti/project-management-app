export interface Project {
    id: ProjectID
    title: string
    description: string
    date: Date
    tasks: Task[]
}

export interface Task {
    id: TaskID
    title: string
    description: string
    isCompleted: boolean
}

export type ProjectID = string;

export type TaskID = string;
