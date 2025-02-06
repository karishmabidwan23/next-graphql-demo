
export type FieldTypes = "Int" | "String" | "Date" | "Boolean" | "Unknown";

export type FormField = {
  name: string;
  type: FieldTypes;
  required?: boolean;
};

