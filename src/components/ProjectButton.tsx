import React from 'react'

interface ProjectButtonProps {
    onClick: () => void
    title: string
    active: boolean
}

export default function ProjectButton({ title, active, onClick }: ProjectButtonProps) {
    let buttonStyles = "text-left w-full px-2 py-1 rounded-md my-1 hover:text-stone-200 hover:bg-stone-700"

    if (active) {
        buttonStyles += " bg-stone-700 text-stone-200"
    } else {
        buttonStyles += " text-stone-400"
    }

    return (
        <li>
            <button onClick={onClick} className={buttonStyles}>
                {title}
            </button>
        </li>
    )
}
