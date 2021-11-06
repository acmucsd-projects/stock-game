import React from 'react';
import {Nav, NavLink, NavMenu, Bars, NavBtn, NavBtnLink} from './NavbarElements';

const NavBar = () => {
    return (
        <div>
            <Nav>
                <NavLink to="/">
                    Logo
                </NavLink>
                <Bars />
                <NavMenu>
                  <NavLink to ="/logout" activeStyle>Logout</NavLink>
                  <NavLink to ="/leaderboard" activeStyle>LeaderBoard</NavLink>
                  <NavLink to ="/profile" activeStyle>Profile</NavLink>
                </NavMenu>
             <NavBtn>
                 <NavBtnLink to="/signin">Sign In</NavBtnLink>
             </NavBtn>
            </Nav>
        </div> 
    )
}

export default NavBar;
