import { useState } from "react";


export const useForm = (initialData, onValidate) => {

    const [inputValue, setinputValue] = useState(initialData)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([])

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(inputValue)

        const err = onValidate(inputValue);

        if(err === null){
            console.log("enviando formulario")
        }else{
            setErrors(err)
        }
    }

    return{
        loading, 
        errors, 
        onSubmit,
        inputValue,
        setinputValue    
    }
}
