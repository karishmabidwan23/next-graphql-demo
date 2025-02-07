import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

export const TextInputField = ({ name, ...rest }: TextFieldProps) => {
  const [field, meta, helpers] = useField(name);
  return (
    <TextField
      name={name}
      label={name}
      value={field.value}
      onChange={(e) => helpers.setValue(e.target.value)}
      {...rest}
      error={!!meta.error}
    />
  );
};
