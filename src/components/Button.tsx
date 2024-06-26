import React from 'react'

interface ButtonProps {
    children: string
    onClick?: () => void
    disabled?: boolean
}

export default function Button({ children, disabled, ...props }: ButtonProps) {
    let buttonStyles = "px-4 py-2 text-xs md:text-base rounded-md";

    if (disabled) {
        buttonStyles += " text-stone-400 bg-stone-300 hover:cursor-default"
    } else if (children === "Yes" || children === "No") {
        buttonStyles += " bg-stone-500 text-stone-200 hover:bg-stone-600 hover:text-stone-100 w-16"
    } else if (children === "Delete") {
        buttonStyles += " text-stone-200 bg-stone-500 hover:text-stone-100 hover:bg-stone-600"
    } else if (children === "Add Task" || children === "Delete Checked Tasks") {
        buttonStyles += " bg-stone-300 hover:bg-stone-200"
    } else {
        buttonStyles += " bg-stone-700 text-stone-300 hover:bg-stone-600 hover:text-stone-100"
    }

    return (
        <button className={buttonStyles} {...props}>
            {children}
        </button>
    )
}
