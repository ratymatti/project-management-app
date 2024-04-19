import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { Project, ProjectID } from "./types/project";
import Container from "./components/Container";
import SelectedProject from "./components/SelectedProject";

interface ProjectsState {
    projects: Project[];
    selectedProjectId: ProjectID | null | undefined;
}

function App() {
    const [projectsState, setProjectsState] = useState<ProjectsState>({
        projects: [],
        selectedProjectId: undefined // renders NoProjectSelected
    });

    function handleStartAddProject(): void {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null // renders NewProject
            }
        });
    }

    function handleAddProject(newProject: Project): void {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projects: [...prevState.projects, newProject],
                selectedProjectId: undefined // renders NoProjectSelected
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
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: projectId
            }
        });
    }

    return (
        <Container className="flex gap-8 h-screen mt-10">
            <Sidebar
                onStartAddProject={handleStartAddProject}
                onSelectProject={handleSelectProject}
                projects={projectsState.projects} />
            {projectsState.selectedProjectId === null &&
                <NewProject
                    addNewProject={handleAddProject}
                    cancelAddProject={handleCancelAddProject} />}
            {projectsState.selectedProjectId === undefined &&
                <NoProjectSelected onStartAddProject={handleStartAddProject} />}
            {projectsState.selectedProjectId && 
                <SelectedProject
                    project={projectsState.projects.find(project => project.id === projectsState.selectedProjectId)!} />}   
        </Container>
    );
}

export default App;
