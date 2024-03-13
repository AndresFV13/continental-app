import React from 'react'

//Styled
import styled from 'styled-components';

const Footer = () => {
    const Footer = styled.footer`
        height: 60px;
        width: 100%;
        border-top: 1px solid #ccc;
        color: #869099;

    `;
    return (
        <Footer className="d-flex justify-content-between px-4 align-items-center">
            <p><strong>Copyright © 2024</strong> <span className='c-blue-light'>Sebastian Quimbayo.</span> Todos los derechos reservados.</p>
            <p><strong>Version</strong> 1.0.0</p>
        </Footer>
    )
}

export default Footer