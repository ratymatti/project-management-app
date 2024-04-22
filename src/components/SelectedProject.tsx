import React, { useContext } from 'react'
import Button from './Button'
import Container from './Container';
import Tasks from './Tasks';
import { ProjectsContext, ProjectsContextType } from '../contexts/ProjectsContext';
import { Task } from '../types/project';

export default function SelectedProject(): JSX.Element {
    const { projectsState, handleDeleteProject, updateProject } = useContext(ProjectsContext) as ProjectsContextType;
    const { projects, selectedProjectID } = projectsState;

    const project = projects.find(project => project.id === selectedProjectID);
    if (!project) {
        return <Container>Project not found.</Container>
    }

    const selectedProject = JSON.parse(JSON.stringify(project));
    selectedProject.date = new Date(selectedProject.date);

    const formattedDate = selectedProject.date.toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    function handleUpdateProjectTasks(tasks: Task[]): void {
        if (!selectedProject) return;

        const updatedProject = {
            ...selectedProject,
            tasks: tasks
        }
        updateProject(updatedProject);
    }

    return (
        <Container className='w-[35rem] mt-16'>
            <header className='pb-4 mb-4 border-b-2 border-stone-300'>
                <Container className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-stone-600 mb-2'>
                        {selectedProject.title}
                    </h1>
                    <Button onClick={() => handleDeleteProject(selectedProject.id)}>
                        Delete
                    </Button>
                </Container>
                <p className='mb-4 text-stone-400'>{formattedDate}</p>
                <p className='text-stone-600 whitespace-pre-wrap'>{selectedProject.description}</p>
            </header>
            <Tasks
                project={selectedProject}
                updateProjectTasks={handleUpdateProjectTasks} />
        </Container>
    )
}
