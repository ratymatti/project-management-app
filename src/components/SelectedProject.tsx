import React from 'react'
import { Project } from '../types/project'
import Button from './Button'
import Container from './Container';

interface SelectedProjectProps {
    project: Project
}

export default function SelectedProject({ project }: SelectedProjectProps) {
    const formattedDate = project.date.toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <Container>
            <header>
                <Container>
                    <h1>
                        {project.title}
                    </h1>
                    <Button>
                        Delete
                    </Button>
                </Container>
                <p>{formattedDate}</p>
                <p>{project.description}</p>
            </header>
        </Container>
    )
}
