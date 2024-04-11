import React from 'react';
import { Nav, NavLink, NavMenu } from './Navbarelements'
// import { useNavigate } from 'react-router-dom'


const Navbar = (props) => {
    // const { loggedIn } = props;
    // const navigate = useNavigate();

    // const logout = () => {
    //     if (loggedIn) {
    //         localStorage.removeItem('user');
    //         props.setLoggedIn(false);
    //     } else {
    //         navigate('/login');
    //     }
    // }

    return (
        <Nav>
            <NavMenu>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/passgen'>Password Generator</NavLink>
                {/* if not logged in
                        then show the 2 buttons
                    and show a logout button */}
                <NavLink to='/create_pass'>Create Password</NavLink>
                <NavLink to='/edit_pass'>Edit Password</NavLink>
                {/* {loggedIn ? <></> : <NavLink to="/login">Login</NavLink>}
                {loggedIn ? <></> : <NavLink to="/signup">Signup</NavLink>}
                {loggedIn ? <NavLink type="button" onClick={logout}>Logout</NavLink> : <></>} */}
            </NavMenu>
        </Nav>
    )
}

export default Navbar