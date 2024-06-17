import { CopilotTextarea } from '@copilotkit/react-textarea';
import React, { useEffect, useState } from 'react'

interface TextareaProps {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    label: string;
}

export default function Textarea({ textareaRef, label }: TextareaProps) {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.value = text;
        }
    }, [text]);

    const styles = "w-full p-1 border-b-2 rounded border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            <CopilotTextarea
                className={styles}
                value={text}
                onValueChange={(value: string) => setText(value)}
                autosuggestionsConfig={{
                    textareaPurpose: "Project description.",
                    chatApiConfigs: {
                        suggestionsApiConfig: {
                            forwardedParams: {
                                max_tokens: 20,
                                stop: [".", "?", "!"],
                            },
                        },
                    },
                }}
            />
        </p>
    )
}
