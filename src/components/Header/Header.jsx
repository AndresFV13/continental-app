import React from 'react'

//Router
import { NavLink, useLocation } from 'react-router-dom';

//Styled
import styled from 'styled-components'
import '../../../src/index.css'

const HeaderComp = styled.header`
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
`;
const Link = styled(NavLink)`
    color: rgba(0, 0, 0, .9);
    text-decoration: none;
    &:hover {
        color: rgba(0, 0, 0, .5);
    }
`;

const Notification = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>;

const Header = () => {

    const location = useLocation();

    return (
        <HeaderComp>
            <nav className="d-flex align-items-center w-80">
                <Link className={`d-block mr-3 ${location.pathname === '/' ? 'isActive' : ''}`} to="/">Alumnos</Link>
                <Link className={`d-block mr-3 ${location.pathname === '/instructores' ? 'isActive' : ''}`} to="/instructores">Instructores</Link>
                <Link className={`d-block mr-3 ${location.pathname === '/vehiculos' ? 'isActive' : ''}`} to="/vehiculos">Vehiculos</Link>
            </nav>
            <div className="w-20 d-flex justify-content-end">
                {Notification}
            </div>
        </HeaderComp>
    )
}

export default Header