import React from 'react'
import { Task, TaskID } from '../types/project'

interface TaskProps {
    task: Task;
    handleCheckTask: (taskID: TaskID) => void;
}

export default function TaskElement({ task, handleCheckTask }: TaskProps) {
    return (
        <li key={task.id} className='flex justify-between my-4'>
            <span className={task.isCompleted ? 'line-through' : ''}>
                {task.description}
            </span>
            <input
                className='accent-green-600 hover:cursor-pointer'
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleCheckTask(task.id)} />
        </li>
    )
}
