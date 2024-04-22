import React, { useContext, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
import NewProjectButton from "./NewProjectButton";
import NewProjectMenu from "./NewProjectMenu";
import Container from "./Container";
import { createNewProject, validateInputs } from "../utils/NewProjectUtils";
import { ProjectsContext, ProjectsContextType } from "../contexts/ProjectsContext";


export default function NewProject(): JSX.Element {
    const {
        handleAddProject,
        handleCancelAddProject
    } = useContext(ProjectsContext) as ProjectsContextType;

    const title = useRef() as React.MutableRefObject<HTMLInputElement>;
    const description = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const dueDate = useRef() as React.MutableRefObject<HTMLInputElement>;
    const modal = useRef<{ open: () => void }>(null);

    const [errorMessage, setErrorMessage] = React.useState<string>('');

    function handleSave(): void {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDateString = dueDate.current.value;

        const errorMessage = validateInputs({ enteredTitle, enteredDescription, enteredDueDateString });
        if (errorMessage) {
            setErrorMessage(errorMessage);
            if (modal.current) {
                modal.current.open();
            }
            return;
        }

        const newProject = createNewProject({ enteredTitle, enteredDescription, enteredDueDateString });
        handleAddProject(newProject);
    }

    return (
        <>
            <Modal ref={modal}>
                {errorMessage}
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