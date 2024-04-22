import React, { useContext, useRef } from 'react'
import Button from './Button'
import Container from './Container';
import Tasks from './Tasks';
import { ProjectsContext, ProjectsContextType } from '../contexts/ProjectsContext';
import { Task } from '../types/project';
import Modal from './Modal';

export default function SelectedProject(): JSX.Element {
    const {
        projectsState,
        handleDeleteProject,
        handleUpdateProject
    } = useContext(ProjectsContext) as ProjectsContextType;

    const modal = useRef<{ open: () => void }>(null);

    const { selectedProject } = projectsState;

    if (!selectedProject) {
        return <Container>Project not found</Container>
    }

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
        handleUpdateProject(updatedProject);
    }

    function confirmDeleteProject(): void {
        if (selectedProject) handleDeleteProject(selectedProject.id);
    }

    return (
        <>
            <Modal ref={modal} onClick={confirmDeleteProject}>
                {"Confirm delete project?"}
            </Modal>
            <Container className='w-[35rem] mt-16'>
                <header className='pb-4 mb-4 border-b-2 border-stone-300'>
                    <Container className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold text-stone-600 mb-2'>
                            {selectedProject.title}
                        </h1>
                        <Button onClick={() => {if (modal.current) modal.current.open()}}>
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
        </>
    )
}
