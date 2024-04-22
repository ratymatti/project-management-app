import React from 'react'
import { Project } from '../types/project'
import NewTask from './NewTask';

interface TasksProps {
    project: Project;
}

export default function Tasks({ project }: TasksProps) {
    return (
        <section>
            <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
            <NewTask />
            {!project.tasks.length &&
                <p className='text-stone-800 mb-4'>This project does not have any tasks yet.</p>}
            <ul>
                {project.tasks.length && project.tasks.map(task => (
                    <li key={task.id}>
                        <p>{task.description}</p>
                        <input type="checkbox" checked={task.isCompleted} onChange={() => {}} />
                        <span>{task.title}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
