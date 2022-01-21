import { ChangeEvent, FormEvent, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { useStore } from '../../store/login';

import { credentials } from '../../config/config';

export default function LoginModal() {
    const { setShouldOpenLoginModal, setStatus, setName } = useStore();

    let [isOpen, setIsOpen] = useState(true);
    let [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    /**
     * Handles form fields changes
     * @param e HTML element change event
     */
    const handleFormData = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    /**
     * Handles form submission
     * @param e HTML element change event
     */
    const handleForm = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (
            formData.username === credentials.username &&
            formData.password === credentials.password
        ) {
            setShouldOpenLoginModal(false);
            setIsOpen(false);
            setStatus(true);
            setName('Coin Mena');
        }
    };

    return (
        <Dialog className="login-modal__wrapper" open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Overlay />

            <Dialog.Title>LOGIN</Dialog.Title>

            <form onSubmit={(e) => handleForm(e)}>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    placeholder="username"
                    onChange={(e) => handleFormData(e)}
                />
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    placeholder="password"
                    onChange={(e) => handleFormData(e)}
                />
                <button type="submit">Login</button>
            </form>
        </Dialog>
    )
}
