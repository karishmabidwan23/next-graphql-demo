"use client";

import { DocumentNode } from "@apollo/client";
import {
  generateYupSchema,
  getFormFields,
  getInitialValues,
} from "./dynamicFormUtils";
import { Button, FormControl } from "@mui/material";
import { useMemo } from "react";
import { TextInputField } from "./form-fields/TextInputField";
import { FormField } from "../type";
import { DateTimeInputField } from "./form-fields/DateInputField";
import { FormikProvider, useFormik } from "formik";
import { CheckboxField } from "./form-fields/CheckboxField";

const fieldComponentMap: Record<string, React.ComponentType<{name: string}>> = {
    Int: TextInputField,
    String: TextInputField,
    Boolean: CheckboxField,
    Date: DateTimeInputField, 
  };
  
  const renderField = (field: FormField) => {
    const Component = fieldComponentMap[field.type];
  
    return Component ? (
      <div className="mb-2" key={field.name}>
        <Component name={field.name}/>
      </div>
    ) : (
      <div>To do: implement rest of other fields...</div>
    );
  };

/**
 *
 * @param param0
 * @returns
 * Dynamic form component, creates form for given graphql query.
 * Uses yup for creating dynamic validation based on field type.
 */
export const DynamicFormComponent = <TVariable,>({
  query,
  onSubmit,
}: {
  query: DocumentNode;
  onSubmit: (data: TVariable) => void;
}) => {
  const formFields = useMemo(() => getFormFields(query) || [], [query]);
  const form = useFormik<TVariable>({
    initialValues: getInitialValues<TVariable>(formFields),
    validationSchema: generateYupSchema(formFields),
    onSubmit: (values: TVariable) => onSubmit(values),
  });

  return (
    <FormControl>
      <FormikProvider value={form} >
        {formFields?.map((field) => renderField(field))}
        <Button onClick={() => form.handleSubmit()}>Submit Form</Button>
      </FormikProvider>
    </FormControl>
  );
};
