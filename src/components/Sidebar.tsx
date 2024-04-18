import React from "react";
import Button from "./Button";

interface SidebarProps {
    onStartAddProject: () => void;
}

export default function Sidebar({ onStartAddProject }: SidebarProps) {

    return (
        <nav className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase">Your Projects</h2>
            <div>
                <Button onClick={onStartAddProject}>
                    + Add Project
                </Button>
            </div>
            <ul>

            </ul>
        </nav>
    )
}