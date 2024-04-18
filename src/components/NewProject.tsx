import React, { useRef } from "react";
import Input from "./Input";
import { Project } from "../types/project";
import Modal from "./Modal";
import NewProjectButton from "./NewProjectButton";
import NewProjectMenu from "./NewProjectMenu";
import Container from "./Container";
import { createNewProject, validateInputs } from "../utils/NewProjectUtils";

interface NewProjectProps {
    addNewProject: (newProject: Project) => void;
    cancelAddProject: () => void;
}

export default function NewProject({ addNewProject, cancelAddProject }: NewProjectProps) {
    const title = useRef() as React.MutableRefObject<HTMLInputElement>;
    const description = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const dueDate = useRef() as React.MutableRefObject<HTMLInputElement>;

    const modal = useRef() as React.MutableRefObject<any>;

    const [errorMessage, setErrorMessage] = React.useState<string>('');

    function handleSave(): void {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDateString = dueDate.current.value;

        const errorMessage = validateInputs({ enteredTitle, enteredDescription, enteredDueDateString });
        if (errorMessage) {
            setErrorMessage(errorMessage);
            modal.current.open();
            return;
        }

        const newProject = createNewProject({ enteredTitle, enteredDescription, enteredDueDateString });
        addNewProject(newProject);
    }

    return (
        <>
            <Modal ref={modal}>
                {errorMessage}
            </Modal>
            <Container className="w-[35rem] mt-16">
                <NewProjectMenu>
                    <NewProjectButton onClick={cancelAddProject}>
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