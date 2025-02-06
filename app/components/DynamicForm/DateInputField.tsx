import { useField } from "formik";
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterFormats } from "@mui/x-date-pickers";

export const DateTimenputField = ({ name, ...rest }: DateTimePickerProps<AdapterFormats>) => {
  const [field, _, helpers] = useField(name);
  return (
    <DateTimePicker
      name={name}
      label={name}
      value={field.value}
      onChange={(value) => helpers.setValue(value)}
      {...rest}
    />
  );
};
