import { useState } from "react";


export const useForm = (
    initialData, 
    onValidate, 
    setShowModalALum, 
    ) => {

    const [inputValue, setinputValue] = useState(initialData)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const onSubmit = (event) => {
        const err = onValidate(inputValue);
        event.preventDefault()
        console.log(inputValue)

        if(err === null){
            console.log("enviando formulario")
            setShowModalALum(false)
            
        }else{
            setErrors(err)
        }
    }

    return{
        loading, 
        errors, 
        inputValue,
        setinputValue,
        onSubmit, 
    }
}
