import { ProjectsState } from "../types/project";
import { testProjects } from "./testProjects";

export const initialProjectsState: ProjectsState = {
    projects: testProjects,
    selectedProjectID: undefined, // renders NoProjectSelected
    selectedProject: null
}