import React from "react";
import Button from "./Button";
import { Project, ProjectID } from "../types/project";
import ProjectButton from "./ProjectButton";

interface SidebarProps {
    onStartAddProject: () => void;
    onSelectProject: (projectId: ProjectID) => void;
    projects: Project[];
}

export default function Sidebar({ onStartAddProject, onSelectProject, projects }: SidebarProps) {

    return (
        <nav className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase">Your Projects</h2>
            <div>
                <Button onClick={onStartAddProject}>
                    + Add Project
                </Button>
            </div>
            <ul className="mt-4">
                {projects.map(project => (
                    <ProjectButton
                        onClick={() => onSelectProject(project.id)}
                        key={project.id}
                        title={project.title} />
                ))}
            </ul>
        </nav>
    )
}