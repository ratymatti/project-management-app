import React, { forwardRef, useImperativeHandle, useRef, ChangeEvent } from "react"

interface InputProps {
    label?: string
    textarea?: boolean
    type?: string
    placeholder?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string
}

type Ref = HTMLInputElement | HTMLTextAreaElement;

const Input = forwardRef<Ref, InputProps>(function Input({ onChange, value, label, textarea, type = 'text', ...props }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => {
        if (textarea && textareaRef.current) {
            return textareaRef.current;
        } else if (!textarea && inputRef.current) {
            return inputRef.current;
        }
        throw new Error('Ref is null');
    });

    const styles = "w-full p-1 border-b-2 rounded border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {textarea ?
                <textarea
                    ref={textareaRef}
                    className={styles}
                    {...props} />
                : <input
                    ref={inputRef}
                    onChange={onChange}
                    value={value}
                    className={styles}
                    type={type}
                    {...props} />}
        </p>
    )
})

export default Input;