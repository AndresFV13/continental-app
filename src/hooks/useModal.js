import { useState } from "react";



export const useModal = () => {

    const [showModalAlum, setShowModalALum] = useState(false);
    const [showModalInst, setShowModalInst] = useState(false);
    const [showModalVehi, setShowModalVehi] = useState(false);
    
    const openModalAlum = () => {
        setShowModalALum(!showModalAlum);
    };

    const openModalInst = () => {
        setShowModalInst(!showModalInst);
    };

    const openModalVehi = () => {
        setShowModalVehi(!showModalVehi);
    };

  return {
    showModalAlum,
    showModalInst,
    showModalVehi,
    setShowModalALum,
    setShowModalInst,
    setShowModalVehi,
    openModalAlum,
    openModalInst,
    openModalVehi
  }
}
