import React, { ChangeEvent, useState } from 'react';
import { Project, Task, TaskID } from '../types/project';
import NewTask, { createNewTask } from './NewTask';
import TaskElement from './TaskElement'
import Button from './Button';
import Container from './Container';
import ConfirmModal from './ConfirmModal';
import Modal from './Modal';
import Input from './Input';
import { useModal } from '../hooks/useModal';

interface TasksProps {
    project: Project;
    updateProjectTasks: (tasks: Task[]) => void;
}

export default function Tasks({ project, updateProjectTasks }: TasksProps) {
    const { modalRef, openModal, closeModal } = useModal();

    const anyTaskCompleted = project.tasks.some(task => task.isCompleted);

    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskDescription(event.target.value);
    }

    function handleAddNewTask(): void {
        if (newTaskDescription.trim() === '') return;

        const newTask = createNewTask(newTaskDescription);
        const currentTasks = project.tasks;
        const updatedTasks = [newTask, ...currentTasks];
        updateProjectTasks(updatedTasks);
        setNewTaskDescription('');
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

    function confirmDeleteTasks(): void {
        const updatedTasks = project.tasks.filter(task => !task.isCompleted);
        updateProjectTasks(updatedTasks);
        closeModal();
    }

    return (
        <>
            <Modal ref={modalRef}>
                <ConfirmModal onConfirm={confirmDeleteTasks} onCancel={closeModal} >
                    {"Confirm delete tasks?"}
                </ConfirmModal>
            </Modal>
            <section className='pb-10'>
                <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
                <NewTask>
                    <Input value={newTaskDescription} onChange={handleChange} />
                    <Button onClick={handleAddNewTask}>Add Task</Button>
                </NewTask>
                {!project.tasks.length &&
                    <p className='text-stone-800 my-4'>This project does not have any tasks yet.</p>}
                {project.tasks.length > 0 &&
                    <>
                        <ul className='p-4 mt-8 rounded-md bg-stone-100'>
                            {project.tasks.length > 0 && project.tasks.map(task => (
                                <TaskElement key={task.id} task={task} handleCheckTask={handleCheckTask} />
                            ))}
                        </ul>
                        <Container className='flex justify-end mt-4'>
                            <Button disabled={!anyTaskCompleted} onClick={openModal}>
                                Delete Checked Tasks
                            </Button>
                        </Container>
                    </>
                }
            </section>
        </>
    )
}
