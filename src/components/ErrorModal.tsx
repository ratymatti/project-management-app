import React from 'react'
import Button from './Button'
import Container from './Container';

interface ErrorModalProps {
    children: string;
    onClick: () => void;
}

export default function ErrorModal({ children, onClick }: ErrorModalProps) {
    return (
        <Container className='text-center'>
            <h2 className='text-xl text-center text-stone-600 font-bold uppercase'>Invalid input</h2>
            <p className='text-stone-500 text-center my-4'>{children}</p>
            <Button onClick={onClick}>{'Close'}</Button>
        </Container>
    )
}
