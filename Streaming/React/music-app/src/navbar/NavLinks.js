import React from 'react';
import './navlinks.css';
import { Link } from 'react-router-dom';

//https://codepen.io/Scotho/pen/ygjOPj
function NavLinks() {
    function logOut() {

    }

    return (
        <span className="dropdown">
            <button>Menu</button>
            <label>
                <input type="checkbox" />
                <ul>
                    <Link to="/homepage"><li>Home</li></Link>
                    <Link to="/account"><li>Account Settings</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/help"><li>Help</li></Link>
                    <li className="divider"></li>
                    <li onClick={logOut}>Log out</li>
                </ul>
            </label>
        </span>
    );
}

export default NavLinks;