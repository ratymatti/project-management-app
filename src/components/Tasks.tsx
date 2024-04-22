import React from 'react'
import { Project, Task } from '../types/project'
import NewTask from './NewTask';

interface TasksProps {
    project: Project;
    updateProjectTasks: (tasks: Task[]) => void;
}

export default function Tasks({ project, updateProjectTasks }: TasksProps) {

    function handleAddNewTask(task: Task): void {
        const currentTasks = project.tasks;
        const updatedTasks = [task, ...currentTasks];
        updateProjectTasks(updatedTasks);
    }

    return (
        <section>
            <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
            <NewTask
                onAddTask={handleAddNewTask} />
            {!project.tasks.length &&
                <p className='text-stone-800 mb-4'>This project does not have any tasks yet.</p>}
            <ul>
                {project.tasks.length > 0 && project.tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isCompleted} onChange={() => {}} />
                        <span className='ml-2'>{task.description}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
