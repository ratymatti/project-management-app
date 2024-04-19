import React from 'react'

interface ButtonProps {
    children: string
    onClick?: () => void
}

export default function Button({ children, ...props }: ButtonProps) {
    let buttonStyles = "px-4 py-2 text-xs md:text-base rounded-md";

    if (children === "Delete") {
        buttonStyles += " text-stone-200 bg-stone-500 hover:text-stone-100 hover:bg-stone-600"
    } else {
        buttonStyles += " bg-stone-700 text-stone-300 hover:bg-stone-600 hover:text-stone-100"
    }

    return (
        <button className={buttonStyles} {...props}>
            {children}
        </button>
    )
}
