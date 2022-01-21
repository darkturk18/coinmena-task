export default interface LoginState {
    name: string;
    setName: (name: string) => void;
    loggedIn: boolean;
    setStatus: (status: boolean) => void;
    shouldOpenLoginModal: boolean;
    setShouldOpenLoginModal: (status: boolean) => void;
}
