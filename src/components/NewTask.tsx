import React, { useState, ChangeEvent } from 'react'
import Container from './Container'
import Input from './Input'
import Button from './Button'
import { Task } from '../types/project';
import { v4 as uuidv4 } from 'uuid';

export function createNewTask(taskDescription: string): Task {
    return {
        id: uuidv4(),
        description: taskDescription,
        isCompleted: false
    };
}

interface NewTaskProps {
    onAddTask: (task: Task) => void;
}

export default function NewTask({ onAddTask}: NewTaskProps) {
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskDescription(event.target.value);
    }

    function handleAddTaskClick() {
        if (!newTaskDescription.length) return;
        const newTask = createNewTask(newTaskDescription);
        onAddTask(newTask);
        setNewTaskDescription('');
    }

    return (
        <Container className='flex items-center gap-4'>
            <Input value={newTaskDescription} onChange={handleChange} />
            <Button onClick={handleAddTaskClick}>Add Task</Button>
        </Container>
    )
}
