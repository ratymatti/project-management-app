import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Container from "./components/Container";
import SelectedProject from "./components/SelectedProject";
import { ProjectsContext, ProjectsContextType } from "./contexts/ProjectsContext";

import "@copilotkit/react-ui/styles.css"; // add to the app-global css
import { CopilotKit } from "@copilotkit/react-core";

function App() {
    const projectsContext = useContext(ProjectsContext) as ProjectsContextType;

    if (!projectsContext) {
        throw new Error("ProjectsContext not available.");
    }

    const { projectsState } = projectsContext;
    const { selectedProjectID, selectedProject } = projectsState;

    return (
        <CopilotKit runtimeUrl="/api/copilotkit/chat">
            <Container className="flex gap-8 h-screen mt-10">
                <Sidebar />
                {selectedProjectID === null &&
                    <NewProject />}
                {selectedProjectID === undefined &&
                    <NoProjectSelected />}
                {selectedProject &&
                    <SelectedProject />}
            </Container>
        </CopilotKit>
    );
}

export default App;
