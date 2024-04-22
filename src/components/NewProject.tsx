import React, { RefObject, useContext, useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";
import NewProjectButton from "./NewProjectButton";
import NewProjectMenu from "./NewProjectMenu";
import Container from "./Container";
import { createNewProject, validateInputs } from "../utils/NewProjectUtils";
import { ProjectsContext, ProjectsContextType } from "../contexts/ProjectsContext";
import { NewProjectTypes, Project } from "../types/project";
import ErrorModal from "./ErrorModal";
import { useModal } from "../hooks/useModal";

export default function NewProject(): JSX.Element {
    const {
        handleAddProject,
        handleCancelAddProject
    } = useContext(ProjectsContext) as ProjectsContextType;

    const title = useRef() as RefObject<HTMLInputElement>;
    const description = useRef() as RefObject<HTMLTextAreaElement>;
    const dueDate = useRef() as RefObject<HTMLInputElement>;
    
    const { modalRef, openModal, closeModal } = useModal();

    const [errorMessage, setErrorMessage] = useState<string>('');

    function handleSave(): void {
        if (!title.current || !description.current || !dueDate.current) {
            console.error('One or more input refs are null');
            return;
        }

        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDateString = dueDate.current.value;

        const newProject: NewProjectTypes = { enteredTitle, enteredDescription, enteredDueDateString };

        const errorMessage = validateInputs(newProject);
        if (errorMessage) {
            setErrorMessage(errorMessage);
            openModal();
            return;
        }

        const createdProject: Project = createNewProject(newProject);
        handleAddProject(createdProject);
    }

    return (
        <>
            <Modal ref={modalRef} >
                <ErrorModal onClick={closeModal} >
                    {errorMessage}
                </ErrorModal>
            </Modal>
            <Container className="w-[35rem] mt-16">
                <NewProjectMenu>
                    <NewProjectButton onClick={handleCancelAddProject}>
                        Cancel
                    </NewProjectButton>
                    <NewProjectButton onClick={handleSave}>
                        Save
                    </NewProjectButton>
                </NewProjectMenu>
                <Container>
                    <Input ref={title} label="Project Name" />
                    <Input ref={description} label="Description" textarea />
                    <Input ref={dueDate} label="Due Date" type="date" />
                </Container>
            </Container>
        </>
    )
}