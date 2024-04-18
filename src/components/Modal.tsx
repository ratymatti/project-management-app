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
                }
            }
        }
        throw new Error('Dialog ref is null');
    });

    return createPortal(
        <dialog ref={dialog} className='backdrop:bg-stone-800/80 w-80 py-8 px-16 rounded-md'>
            <h2 className='text-xl text-center text-stone-500 font-bold uppercase'>Invalid input</h2>
            <p className='text-stone-400 text-center mt-2'>{children}</p>
            <form className='text-center mt-6' method="dialog">
                <Button>{'Close'}</Button>
            </form>
        </dialog>,
        modalRoot
    )
})

export default Modal;
