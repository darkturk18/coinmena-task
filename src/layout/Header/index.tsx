import { NavLink } from "react-router-dom";

import { useStore } from '../../store/login';

export default function Header() {
    let activeClassName: string = 'active';

    const { loggedIn, name, setShouldOpenLoginModal } = useStore();

    return (
        <header className="header-wrapper">
            <nav className="container">
                <NavLink to="/">
                    <div className="nav-logo">COINMENA</div>
                </NavLink>
                <div className="nav-items">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? activeClassName : ''}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/trade"
                        className={({ isActive }) => isActive ? activeClassName : ''}
                    >
                        Trade
                    </NavLink>
                </div>
                <div
                    className={`nav-login ${loggedIn ? ' logged-in' : ''}`}
                    onClick={() => setShouldOpenLoginModal(!loggedIn)}
                >
                    {loggedIn ? `Welcome ${name}` : 'LOGIN'}
                </div>
            </nav>
        </header>
    )
}
