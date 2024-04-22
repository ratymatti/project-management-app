import React, { useContext } from 'react'
import noProjectImage from '../assets/no-projects.png';
import Button from './Button';
import Container from './Container';
import { ProjectsContext, ProjectsContextType } from '../contexts/ProjectsContext';

export default function NoProjectSelected(): JSX.Element {
    const { handleStartAddProject } = useContext(ProjectsContext) as ProjectsContextType;

    return (
        <Container className='mt-24 text-center w-2/3'>
            <img src={noProjectImage} alt='An Empty Tasks List' className='w-16 h-16 object-contain mx-auto' />
            <h2 className='text-xl font-bold text-stone-500 my-4'>No Project Selected</h2>
            <p className='text-stone-400 mb-4'>Select a project or get started with a new one</p>
            <p className='mt-8'>
                <Button onClick={handleStartAddProject}>
                    Create New Project
                </Button>
            </p>
        </Container>
    )
}
