import React from 'react'
import Button from './Button'
import Container from './Container'

interface ConfirmModalProps {
    onConfirm: () => void;
    onCancel:() => void;
}

export default function ConfirmModal({ onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <>
            <p className='text-stone-500 text-center my-4'>{"Confirm delete project?"}</p>
            <Container className='flex justify-center gap-6 my-4'>
                <Button onClick={onConfirm}>
                    Yes
                </Button>
                <Button onClick={onCancel}>
                    No
                </Button>
            </Container>
        </>
    )
}
