import React from 'react'

interface ProjectButtonProps {
    title: string
}

export default function ProjectButton({ title }: ProjectButtonProps) {
    const buttonStyles = "text-left w-full text-stone-400 px-2 py-1 rounded-md my-1 hover:text-stone-200 hover:bg-stone-800"

    return (
        <li>
            <button className={buttonStyles}>
                {title}
            </button>
        </li>
    )
}
