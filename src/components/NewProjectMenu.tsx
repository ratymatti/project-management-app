import React, { ReactNode } from 'react';

interface NewProjectMenuProps {
    children: ReactNode;
}

export default function NewProjectMenu({children}: NewProjectMenuProps) {
    return (
        <menu className="flex items-center justify-end gap-4 my-4">
            {children}
        </menu>
    )
}
