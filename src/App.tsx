import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { Project } from "./types/project";

interface ProjectsState {
    projects: Project[];
    selectedProjectId: string | null | undefined;
}

function App() {
    const [projectsState, setProjectsState] = useState<ProjectsState>({
        projects: [],
        selectedProjectId: undefined
    });

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null
            }
        })
    }

    function handleAddProject(newProject: Project) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projects: [...prevState.projects, newProject]
            }
        })
    }

    return (
        <div className="flex gap-8 h-screen mt-10">
            <Sidebar onStartAddProject={handleStartAddProject} />
            {projectsState.selectedProjectId === null && <NewProject />}
            {projectsState.selectedProjectId === undefined && <NoProjectSelected onStartAddProject={handleStartAddProject} />}
        </div>
    );
}

export default App;
