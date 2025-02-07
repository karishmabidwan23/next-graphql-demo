import { useField } from "formik";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { AdapterFormats } from "@mui/x-date-pickers";

export const DateTimeInputField = ({
  name,
  ...rest
}: DateTimePickerProps<AdapterFormats>) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <DateTimePicker
        name={name}
        label={name}
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        {...rest}
      />
      {meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
