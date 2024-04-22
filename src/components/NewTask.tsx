import React, { useState, ChangeEvent } from 'react'
import Container from './Container'
import Input from './Input'
import Button from './Button'

export default function NewTask() {
    const [newTask, setNewTask] = useState<string>();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function handleClick() {
        // Add new task
        // Clear state for new task
    }

    return (
        <Container className='flex items-center gap-4'>
            <Input value={newTask} onChange={handleChange} />
            <Button>Add Task</Button>
        </Container>
    )
}
