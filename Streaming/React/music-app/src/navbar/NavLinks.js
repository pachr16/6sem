import React, { useContext } from 'react';
import './navlinks.css';
import { Link, Redirect } from 'react-router-dom';
import { AuthorizationContext } from '../homepage/login/AuthorizationContext';
import Login from '../homepage/login/Login';

//https://codepen.io/Scotho/pen/ygjOPj
function NavLinks() {
    const [loggedID, setLoggedID] = useContext(AuthorizationContext);

    function logOut() {
        setLoggedID("-1");
    }

    function logIn() {
        window.location.pathname = "/";     // can only happen when not logged in, so no state to save - therefore no need to redirect through react
    }

    return (
        <span className="dropdown">
            <button>Menu</button>
            <label>
                <input type="checkbox" />
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/account"><li>Account Settings</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/help"><li>Help</li></Link>
                    <li className="divider"></li>
                    {loggedID < 0 ? <li onClick={logIn}>Log in</li> : <li onClick={logOut}>Log out</li>}
                </ul>
            </label>
        </span>
    );
}

export default NavLinks;