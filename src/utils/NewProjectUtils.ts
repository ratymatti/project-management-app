import { v4 as uuidv4 } from 'uuid';
import { NewProjectTypes, Project } from "../types/project";

export function validateInputs(newProject: NewProjectTypes): string | null {
    const { enteredTitle, enteredDescription, enteredDueDateString } = newProject;

    if (!enteredTitle || enteredTitle.trim().length === 0) {
        return 'Please enter a title';
    } else if (!enteredDescription || enteredDescription.trim().length === 0) {
        return 'Please enter a description';
    } else if (!enteredDueDateString || enteredDueDateString.trim().length === 0) {
        return 'Please select a due date';
    }
    return null;
}

export function createNewProject(newProject: NewProjectTypes): Project {
    const { enteredTitle, enteredDescription, enteredDueDateString } = newProject;

    const enteredDueDate = new Date(enteredDueDateString);

    return {
        id: uuidv4(),
        title: enteredTitle,
        description: enteredDescription,
        date: enteredDueDate,
        tasks: []
    };
}