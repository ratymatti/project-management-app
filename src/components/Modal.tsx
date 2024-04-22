import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button';

type Ref = any;

interface ModalProps {
    children: any
}

const Modal = forwardRef<Ref, ModalProps>(function Modal({ children }, ref) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) throw new Error('Modal root not found');

    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        if (dialog.current) {
            return {
                open() {
                    dialog.current?.showModal();
                },
                close() {
                    dialog.current?.close();
                }
            }
        }
        throw new Error('Dialog ref is null');
    });

    return createPortal(
        <dialog ref={dialog} className='backdrop:bg-stone-800/80 w-80 py-8 px-16 rounded-md'>
            {children}
        </dialog>,
        modalRoot
    )
})

export default Modal;
