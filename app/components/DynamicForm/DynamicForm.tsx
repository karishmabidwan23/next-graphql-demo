"use client";

import { DocumentNode } from "@apollo/client";
import {
  generateYupSchema,
  getFormFields,
  getInitialValues,
} from "./dynamicFormUtils";
import { Button, Checkbox, FormControl } from "@mui/material";
import { useMemo } from "react";
import { TextInputField } from "./TextInputField";
import { FormField } from "../type";
import { DateTimenputField } from "./DateInputField";
import { Formik, FormikProvider, useFormik } from "formik";

const renderField = (field: FormField) => {
  if (field.type === "Int" || field.type === "String")
    return <TextInputField {...field} key={field.name} />;
  if (field.type === "Boolean") return <Checkbox />;
  if (field.type === "Date")
    return <DateTimenputField {...field} key={field.name} />;

  return <div>To do implement field</div>;
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
  const form = useFormik({
    initialValues: getInitialValues(formFields),
    validationSchema: generateYupSchema(formFields),
    onSubmit: (values) => onSubmit(values as TVariable),
  });

  return (
    <FormControl>
      <FormikProvider value={form}>
        {formFields?.map((field) => renderField(field))}
        <Button onClick={() => form.handleSubmit()}>Submit Form</Button>
      </FormikProvider>
    </FormControl>
  );
};
