import { InputLabel, TextField } from "@mui/material";
import { useState } from "react"
import { cnpjMask } from '../../utils/cnpjMask';

export default function CpnjInput({register}){
    const [values, setValues] = useState({ cnpjProvider: '' })
  
    const inputChange = (e) => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
    }

    return(
        <>
        <InputLabel id="cnpj-prestador">CNPJ do Estabelecimento: </InputLabel>
        <TextField
              {...register('cnpjProvider')}
              fullWidth
              id="cnpjProvider"
              type="text"
              name='cnpjProvider'
              value={cnpjMask(values.cnpjProvider)}
              onChange={inputChange}
              autoFocus
            />
        </>
        
    )
  
}