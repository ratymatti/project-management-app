import React from 'react'
import { Project } from '../types/project'
import Button from './Button'
import Container from './Container';
import Tasks from './Tasks';
import { v4 as uuidv4 } from 'uuid';

interface SelectedProjectProps {
    project: Project
    onDeleteProject: (projectId: string) => void
}

export default function SelectedProject({ project, onDeleteProject }: SelectedProjectProps) {
    const formattedDate = project.date.toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    function updateProject(newTask: string) {
        const updatedProject = {
            ...project,
            tasks: [
                {
                    id: uuidv4(),
                    title: newTask,
                    isCompleted: false
                },
                ...project.tasks,
            ]
        };
    }

    return (
        <Container className='w-[35rem] mt-16'>
            <header className='pb-4 mb-4 border-b-2 border-stone-300'>
                <Container className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-stone-600 mb-2'>
                        {project.title}
                    </h1>
                    <Button onClick={() => onDeleteProject(project.id)}>
                        Delete
                    </Button>
                </Container>
                <p className='mb-4 text-stone-400'>{formattedDate}</p>
                <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
            </header>
            <Tasks project={project} />
        </Container>
    )
}
