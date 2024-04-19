import React from "react";
import Button from "./Button";
import { ProjectID } from "../types/project";
import ProjectButton from "./ProjectButton";
import { ProjectsState } from "../App";

interface SidebarProps {
    onStartAddProject: () => void;
    onSelectProject: (projectId: ProjectID) => void;
    projectsState: ProjectsState
}

export default function Sidebar({ onStartAddProject, onSelectProject, projectsState }: SidebarProps) {
    const { projects, selectedProjectId } = projectsState;

    return (
        <nav className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase">Your Projects</h2>
            <div>
                <Button onClick={onStartAddProject}>
                    + Add Project
                </Button>
            </div>
            <ul className="mt-4">
                {projects.map(project => {
                    const handleSelectProject = () => onSelectProject(project.id);

                    let active = false;
                    if (selectedProjectId === project.id) {
                        active = true;
                    }

                    return (
                        <ProjectButton
                            onClick={handleSelectProject}
                            key={project.id}
                            title={project.title}
                            active={active} />
                    );
                })}
            </ul>
        </nav>
    )
}