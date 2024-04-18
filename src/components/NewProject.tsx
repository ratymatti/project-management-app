import React, { useRef } from "react";
import Input from "./Input";
import { v4 as uuidv4 } from 'uuid';

export default function NewProject() {
    const title = useRef() as React.MutableRefObject<HTMLInputElement>;
    const description = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const dueDate = useRef() as React.MutableRefObject<HTMLInputElement>;

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDateString = dueDate.current.value;
        const enteredDueDate = new Date(enteredDueDateString);
        
        const newProject = {
            id: uuidv4(),
            title: enteredTitle,
            description: enteredDescription,
            date: enteredDueDate
        }
    }


    return (
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone950">Cancel</button>
                </li>
                <li>
                    <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
                </li>
            </menu>

            <div>
                <Input ref={title} label="Project Name" />
                <Input ref={description} label="Description" textarea />
                <Input ref={dueDate} label="Due Date" type="date" />
            </div>
        </div>
    )
}