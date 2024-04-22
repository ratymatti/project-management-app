import React, { useState, ChangeEvent, ReactNode } from 'react'
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
    children: ReactNode;
}

export default function NewTask({ children }: NewTaskProps) {
    return (
        <Container className='flex items-center gap-4'>
            {children}
        </Container>
    )
}
