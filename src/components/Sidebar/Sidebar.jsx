import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// images
import logo from "../../../public/img/AdminLTELogo.png"
import userLogo from '../../../public/img/user-logo.png' 

//Styled
import styled from 'styled-components';
import '../../components/Modals/style.css'
import '../../../src/index.css'

// Hooks
import { useModal } from '../../hooks/useModal'

// Modales
import { ModalAlumnos } from '../Modals/create/ModalAlumnos';
import { ModalInstructores } from '../Modals/create/ModalInstructores';
import { ModalVehiculos } from '../Modals/create/ModalVehiculos'

//icons
import { InstrucIcon, SignOff, carIcon, userMore } from '../../../public/icons/icons';


const Sidebar = () => {

    const {
        showModalAlum,
        showModalInst,
        showModalVehi,
        setShowModalALum,
        setShowModalInst,
        setShowModalVehi,
        openModalAlum,
        openModalInst,
        openModalVehi
    } = useModal()

    const Sidebar = styled.aside`
        height: 100%;
        width: 240px;
        background-color: #343a40;
    `;
    const ProfilePic = styled.img`
        width: 33px;
        border-radius: 100%;
        margin: 16px 0;
    `;
    const ProfileSection = styled.div`
        padding: 0 12px;
    `;
    const ProfileName = styled.p`
        margin-left: 10px;
        font-size: 16px;
        color: #FFFFFF;
    `;
    return (
        <Sidebar>
            <Link className='d-flex align-items-center justify-content-start tx-n b-bottom' to="/">
                <img className='w-4 p-3' src={logo} alt="Logo" />
                <p className='logo-color'> Continental App </p>
            </Link>
            <ProfileSection className="d-flex align-items-center b-bottom">
                <ProfilePic src={userLogo} alt="Alejandro Sabogal" />
                <ProfileName className='logo-color'> Sebastian Quimbayo </ProfileName>
            </ProfileSection>
            <div className='d-flex flex-column p-2 mt-2'>
                <Link to="/"
                      className='d-flex align-items-center m-1 py-2 buttons ft-07 text-align-center justify-content-flex-start pl-3' 
                      onClick={openModalAlum}>
                            <span className='d-flex mr-2'>{userMore}</span>
                             Agregar Alumno 
                </Link>
                { showModalAlum === true ? <ModalAlumnos setShowModalALum={setShowModalALum}/> : null }
                <Link to="/instructores"
                      className='d-flex align-items-center m-1 py-2 buttons ft-07 text-align-center justify-content-flex-start pl-3' 
                      onClick={openModalInst}> 
                            <span className='d-flex mr-2'>{InstrucIcon}</span>
                            Agregar instructor 
                </Link>
                { showModalInst === true ? <ModalInstructores setShowModalInst={setShowModalInst}/> : null }
                <Link to="/vehiculos"
                      className='d-flex align-items-center m-1 py-2 buttons ft-07 text-align-center justify-content-flex-start pl-3' 
                      onClick={openModalVehi}>
                            <span className='d-flex mr-2'>{carIcon}</span>
                            Agregar Vehiculo 
                </Link>
                { showModalVehi === true ? <ModalVehiculos setShowModalVehi={setShowModalVehi}/> : null }
            </div>
            <div className='d-flex flex-column p-2 mt-2'>
                <Link className='d-flex align-items-center m-1 py-2 buttons ft-07 text-align-center justify-content-flex-start pl-3'
                    to="/login">
                    <span className='d-flex mr-2'>{SignOff}</span>
                    Cerrar Sesion
                </Link>
            </div>
        </Sidebar>
    )
}

export default Sidebar