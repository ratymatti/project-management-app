import React, { useContext } from "react";
import Button from "./Button";
import ProjectButton from "./ProjectButton";
import { ProjectsContext, ProjectsContextType } from "../contexts/ProjectsContext";

export default function Sidebar(): JSX.Element {
    const {
        projectsState,
        handleStartAddProject,
        handleSelectProject
    } = useContext(ProjectsContext) as ProjectsContextType;

    const { projects, selectedProjectID } = projectsState;

    return (
        <nav className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase">Your Projects</h2>
            <div>
                <Button onClick={handleStartAddProject}>
                    + Add Project
                </Button>
            </div>
            <ul className="mt-4">
                {projects.map(project => {
                    const onSelectProject = () => handleSelectProject(project.id);

                    let active = selectedProjectID === project.id;

                    return (
                        <ProjectButton
                            onClick={onSelectProject}
                            key={project.id}
                            title={project.title}
                            active={active} />
                    );
                })}
            </ul>
        </nav>
    )
}