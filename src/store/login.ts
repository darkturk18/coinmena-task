import create from "zustand";

import LoginState from '../types/loginState';

const useStore = create<LoginState>((set) => ({
    name: "",
    setName: (name) =>
        set((state) => ({
            ...state,
            name
        })),
    loggedIn: false,
    setStatus: (status) => {
        set((state) => ({
            ...state,
            loggedIn: status
        }))
    },
    shouldOpenLoginModal: false,
    setShouldOpenLoginModal: (status) => {
        set((state) => ({
            ...state,
            shouldOpenLoginModal: status
        }))
    },
}));

export { useStore };
