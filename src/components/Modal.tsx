import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button';
import Container from './Container';

type Ref = any;

interface ModalProps {
    children: string
    error?: boolean
    onClick?: () => void
}

const Modal = forwardRef<Ref, ModalProps>(function Modal({ children, error, onClick }, ref) {
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
            {error && <h2 className='text-xl text-center text-stone-600 font-bold uppercase'>Invalid input</h2>}
            <p className='text-stone-500 text-center mt-2'>{children}</p>
            {error && <form className='text-center mt-6' method="dialog">
                <Button>{'Close'}</Button>
            </form>}
            {!error &&
                    <form method='dialog' className='flex justify-center gap-6 mt-4'>
                        <Button onClick={onClick}>
                            Yes
                        </Button>
                        <Button>
                            No
                        </Button>
                    </form>
            }
        </dialog>,
        modalRoot
    )
})

export default Modal;
