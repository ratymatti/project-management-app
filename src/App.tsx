import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { Project, ProjectID } from "./types/project";
import Container from "./components/Container";
import SelectedProject from "./components/SelectedProject";

export interface ProjectsState {
    projects: Project[];
    selectedProjectId: ProjectID | null | undefined;
    selectedProject: Project | null;
}

function App() {
    const [projectsState, setProjectsState] = useState<ProjectsState>({
        projects: [],
        selectedProjectId: undefined, // renders NoProjectSelected
        selectedProject: null
    });

    function handleStartAddProject(): void {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null, // renders NewProject
                selectedProject: null // clears SelectedProject
            }
        });
    }

    function handleAddProject(newProject: Project): void {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projects: [...prevState.projects, newProject],
                selectedProjectId: newProject.id, 
                selectedProject: newProject // renders SelectedProject with newProject
            }
        });
    }

    function handleCancelAddProject(): void {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined // renders NoProjectSelected
            }
        });
    }

    function handleSelectProject(projectId: ProjectID): void {
        const project = projectsState.projects.find(project => project.id === projectId);

        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: projectId,
                selectedProject: project! // renders SelectedProject with project
            }
        });
    }

    function handleDeleteProject(projectId: ProjectID): void {
        setProjectsState(prevState => {
            const updatedProjects = prevState.projects.filter(project => project.id !== projectId);
            return {
                ...prevState,
                projects: updatedProjects,
                selectedProjectId: undefined, // renders NoProjectSelected
                selectedProject: null // clears SelectedProject
            }
        });
    }

    return (
        <Container className="flex gap-8 h-screen mt-10">
            <Sidebar
                onStartAddProject={handleStartAddProject}
                onSelectProject={handleSelectProject}
                projectsState={projectsState} />
            {projectsState.selectedProjectId === null &&
                <NewProject
                    addNewProject={handleAddProject}
                    cancelAddProject={handleCancelAddProject} />}
            {projectsState.selectedProjectId === undefined &&
                <NoProjectSelected onStartAddProject={handleStartAddProject} />}
            {projectsState.selectedProject && 
                <SelectedProject
                    project={projectsState.selectedProject}
                    onDeleteProject={handleDeleteProject} />}   
        </Container>
    );
}

export default App;
