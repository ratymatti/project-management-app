import { v4 as uuidv4 } from 'uuid';
import { Project } from "../types/project";

interface InputTypes {
    enteredTitle: string;
    enteredDescription: string;
    enteredDueDateString: string;
}

export function validateInputs({ enteredTitle, enteredDescription, enteredDueDateString }: InputTypes): string | null {
    if (!enteredTitle || enteredTitle.trim().length === 0) {
        return 'Please enter a title';
    } else if (!enteredDescription || enteredDescription.trim().length === 0) {
        return 'Please enter a description';
    } else if (!enteredDueDateString || enteredDueDateString.trim().length === 0) {
        return 'Please select a due date';
    }
    return null;
}

export function createNewProject({ enteredTitle, enteredDescription, enteredDueDateString }: InputTypes): Project {
    const enteredDueDate = new Date(enteredDueDateString);
    return {
        id: uuidv4(),
        title: enteredTitle,
        description: enteredDescription,
        date: enteredDueDate,
        tasks: []
    };
}