import React from 'react'

//Router
import { Outlet } from 'react-router-dom';

//Components
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

//Styled
import styled from 'styled-components';

const Layout = () => {
    const Main  = styled.main`
        height: calc(100% - 120px);
    `;
    const Wrapper = styled.div`
        width: calc(100% - 240px);
    `;
    return (
        <div className="d-flex h-100">
            <Sidebar />
            <Wrapper className="h-100">
                <Header>Header</Header>
                <Main className="">
                    <Outlet />
                </Main>
                <Footer>Footer</Footer>
            </Wrapper>
        </div>
    )
}

export default Layout