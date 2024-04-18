import React, { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, ...props }: ContainerProps) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}
