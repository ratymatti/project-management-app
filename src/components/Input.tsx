import React from "react"

interface InputProps {
    label: string
    textarea?: boolean
    type?: string
    placeholder?: string
}

export default function Input({ label, textarea, ...props }: InputProps) {
    const styles = "w-full p-1 border-b-2 rounded border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {textarea ?
                <textarea className={styles} {...props} />
                : <input className={styles} {...props} />}
        </p>
    )
}