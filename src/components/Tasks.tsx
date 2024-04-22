import React from 'react';
import { Project, Task, TaskID } from '../types/project';
import NewTask from './NewTask';
import TaskElement from './TaskElement'
import Button from './Button';
import Container from './Container';

interface TasksProps {
    project: Project;
    updateProjectTasks: (tasks: Task[]) => void;
}

export default function Tasks({ project, updateProjectTasks }: TasksProps) {

    const anyTaskCompleted = project.tasks.some(task => task.isCompleted);

    function handleAddNewTask(task: Task): void {
        const currentTasks = project.tasks;
        const updatedTasks = [task, ...currentTasks];
        updateProjectTasks(updatedTasks);
    }

    function handleCheckTask(taskID: TaskID): void {
        const updatedTasks = project.tasks.map(task => {
            if (task.id === taskID) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted
                }
            }
            return task;
        });
        updateProjectTasks(updatedTasks);
    }

    function handleDeleteCheckedTasks(): void {
        const updatedTasks = project.tasks.filter(task => !task.isCompleted);
        updateProjectTasks(updatedTasks);
    }

    return (
        <section className='pb-10'>
            <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
            <NewTask
                onAddTask={handleAddNewTask} />
            {!project.tasks.length &&
                <p className='text-stone-800 my-4'>This project does not have any tasks yet.</p>}
            <ul className='p-4 mt-8 rounded-md bg-stone-100'>
                {project.tasks.length > 0 && project.tasks.map(task => (
                    <TaskElement key={task.id} task={task} handleCheckTask={handleCheckTask} />
                ))}
            </ul>
            <Container className='flex justify-end mt-4'>
                <Button disabled={!anyTaskCompleted} onClick={handleDeleteCheckedTasks}>
                    Delete Checked Tasks
                </Button>
            </Container>
        </section>
    )
}
