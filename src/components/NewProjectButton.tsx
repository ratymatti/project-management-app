import React from 'react'
import { Project } from '../types/project';

interface NewProjectButtonProps {
    children: string;
    onClick?: () => void;
}

export default function NewProjectButton({ children, ...props }: NewProjectButtonProps) {
    let buttonStyles;

    if (children === 'Save') {
        buttonStyles = "px-6 py-2 rounded-md bg-stone-600 text-stone-50 hover:bg-stone-800";
    } else {
        buttonStyles = "text-stone-800 hover:text-stone-500";
    }
    return (
        <li>
            <button className={buttonStyles} {...props}>
                {children}
            </button>
        </li>
    )
}
