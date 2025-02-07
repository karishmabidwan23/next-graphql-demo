import { Checkbox, CheckboxProps } from "@mui/material"
import { useField } from "formik";



export const CheckboxField = ({name, ...rest}: CheckboxProps) => {
    const [field, meta, helpers] = useField(name);

    return <>
    <Checkbox
        name={field.name}
        onChange={helpers.setValue}
        {...rest}
    />
    {meta.error?<div>{meta.error}</div>:null}
    </>
}