import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// images
import logo from "../../../public/img/AdminLTELogo.png"

//Styled
import styled from 'styled-components';
import '../../components/Modals/style.css'

// Modales
import { ModalAlumnos } from '../Modals/ModalAlumnos';
import { ModalVehiculos } from '../Modals/ModalVehiculos';
import { ModalInstructores } from '../Modals/ModalInstructores';

const Sidebar = () => {

    const [showModalAlum, setShowModalALum] = useState(false);
    const [showModalInst, setShowModalInst] = useState(false);
    const [showModalVehi, setShowModalVehi] = useState(false);

    const openModalAlum = () => {
        setShowModalALum(true);
        console.log(showModalAlum)
    };

    const openModalInst = () => {
        setShowModalInst(true);
    };

    const openModalVehi = () => {
        setShowModalVehi(true);
    };

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
            <Link className='d-flex align-items-center justify-content-start tx-n' to="/">
                <img className='w-5 p-3' src={logo} alt="Logo" />
                <p className='logo-color'> Continental App </p>
            </Link>
            <ProfileSection className="d-flex align-items-center">
                <ProfilePic src="https://scontent.fibe1-1.fna.fbcdn.net/v/t39.30808-1/391625107_3629684080593702_2695546240744665024_n.jpg?stp=dst-jpg_p160x160&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-YlHd39nPVQAX_DjERo&_nc_ht=scontent.fibe1-1.fna&oh=00_AfD9gI3kfqvWncgpEaX7Ioybz2Z5yM2SIcOvEbl-Zd1UFw&oe=65F1A8A5" alt="Alejandro Sabogal" />
                <ProfileName className='logo-color'> Sebastian Quimbayo </ProfileName>
            </ProfileSection>
            <div className='d-flex flex-column p-2 mt-2'>
                <button className='m-1 py-2 buttons ft-07' 
                        onClick={openModalAlum}>
                             Agregar Alumno 
                </button>
                { showModalAlum === true ? <ModalAlumnos setShowModalALum={setShowModalALum}/> : null }
                <button className='m-1 py-2 buttons ft-07'
                        onClick={openModalInst}> 
                            Agregar instructor 
                </button>
                { showModalInst === true ? <ModalInstructores setShowModalInst={setShowModalInst}/> : null }
                <button className='m-1 py-2 buttons ft-07'
                        onClick={openModalVehi}> 
                            Agregar Vehiculo 
                </button>
                { showModalVehi === true ? <ModalVehiculos setShowModalVehi={setShowModalVehi}/> : null }
            </div>
        </Sidebar>
    )
}

export default Sidebar