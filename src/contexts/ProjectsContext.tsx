import React, {
    ReactNode,
    createContext,
    useState
} from 'react'

import {
    Project,
    ProjectID,
    ProjectsState
} from '../types/project';

import { initialProjectsState } from '../utils/initialProjectsState'

export interface ProjectsContextType {
    projectsState: ProjectsState;
    handleStartAddProject: () => void;
    handleAddProject: (newProject: Project) => void;
    handleCancelAddProject: () => void;
    handleSelectProject: (projectId: ProjectID) => void;
    handleDeleteProject: (projectId: ProjectID) => void;
    handleUpdateProject: (updatedProject: Project) => void;
}

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }): JSX.Element {
    const [projectsState, setProjectsState] = useState<ProjectsState>({ ...initialProjectsState });

    function handleStartAddProject(): void {
        setProjectsState((prevState: ProjectsState): ProjectsState => {
            return {
                ...prevState,
                selectedProjectID: null, // renders NewProject
                selectedProject: null // clears SelectedProject
            }
        });
    }

    function handleAddProject(newProject: Project): void {
        setProjectsState((prevState: ProjectsState): ProjectsState => {
            return {
                ...prevState,
                projects: [...prevState.projects, newProject],
                selectedProjectID: newProject.id,
                selectedProject: newProject // renders SelectedProject with newProject
            }
        });
    }

    function handleCancelAddProject(): void {
        setProjectsState((prevState: ProjectsState): ProjectsState => {
            return {
                ...prevState,
                selectedProjectID: undefined // renders NoProjectSelected
            }
        });
    }

    function handleSelectProject(projectId: ProjectID): void {
        const project = deepCopyProject(projectId);

        setProjectsState((prevState: ProjectsState): ProjectsState => {
            return {
                ...prevState,
                selectedProjectID: projectId,
                selectedProject: project! // renders SelectedProject with project
            }
        });
    }

    function handleDeleteProject(projectId: ProjectID): void {
        setProjectsState((prevState: ProjectsState): ProjectsState => {
            const updatedProjects = prevState.projects.filter(project => project.id !== projectId);
            return {
                ...prevState,
                projects: updatedProjects,
                selectedProjectID: undefined, // renders NoProjectSelected
                selectedProject: null // clears SelectedProject
            }
        });
    }

    function handleUpdateProject(updatedProject: Project): void {
        setProjectsState((prevState: ProjectsState): ProjectsState => {
            const updatedProjects = prevState.projects.map(project => {
                if (project.id === updatedProject.id) {
                    return updatedProject;
                }
                return project;
            });
            return {
                ...prevState,
                projects: updatedProjects,
                selectedProject: updatedProject
            }
        });
    }

    function deepCopyProject(projectID: ProjectID): Project {
        const project = projectsState.projects.find(project => project.id === projectID);
        if (!project) {
            throw new Error('Project not found');
        }
        const projectCopy = JSON.parse(JSON.stringify(project));
        projectCopy.date = new Date(projectCopy.date);

        return projectCopy;
    }

    const values: ProjectsContextType = {
        projectsState,
        handleStartAddProject,
        handleAddProject,
        handleCancelAddProject,
        handleSelectProject,
        handleDeleteProject,
        handleUpdateProject
    };

    return (
        <ProjectsContext.Provider value={values}>
            {children}
        </ProjectsContext.Provider>
    )
}
