import { DocumentNode, Kind, NamedTypeNode, NonNullTypeNode, OperationDefinitionNode } from "graphql";
import { FieldTypes, FormField } from "../type";
import * as yup from "yup";

const getFieldType = (gqlType: string): FieldTypes => {
    switch (gqlType) {
      case "Int":
      case "Float":
        return "Int";
      case "Boolean":
        return "Boolean";
      case "ID":
      case "String":
        return "String";
      case "Date":
        return "Date";
      default:
        return "Unknown";
    }
  };
  
export const getFormFields = (query: DocumentNode): Array<FormField> | undefined => {
    const variableDefination = (query.definitions[0] as OperationDefinitionNode)
      ?.variableDefinitions;
    return variableDefination?.map((vd) => {
      const isRequired = vd.type.kind === Kind.NON_NULL_TYPE;
      const type = getFieldType(
        isRequired
          ? ((vd.type as NonNullTypeNode).type as NamedTypeNode).name.value
          : (vd.type as NamedTypeNode).name.value
      );
      return {
        name: vd.variable.name.value,
        type,
        required: isRequired,
      };
    });
  };

  export function generateYupSchema(fields: FormField[]) {
    const schemaShape: Record<string, yup.AnySchema> = {};
  
    fields.forEach(({ name, type, required }) => {
      let fieldSchema: yup.AnySchema;
  
      switch (type) {
        case "String":
          fieldSchema = yup.string();
          break;
        case "Int":
          fieldSchema = yup.number().integer();
          break;
        case "Boolean":
          fieldSchema = yup.boolean();
          break;
        case "Date":
          fieldSchema = yup.date();
          break;
        case "Unknown":
          fieldSchema = yup.mixed();
          break;
        default:
          throw new Error(`Unsupported field type: ${type}`);
      }
  
      if (required) {
        fieldSchema = fieldSchema.required("This field is required");
      }
  
      schemaShape[name] = fieldSchema;
    });
  
    return yup.object().shape(schemaShape);
  }

  export function getInitialValues(fields: FormField[]) {
    const initialValues: Record<string, any> = {};
  
    fields.forEach(({ name, type }) => {
      switch (type) {
        case "String":
          initialValues[name] = "";
          break;
        case "Int":
          initialValues[name] = 0;
          break;
        case "Boolean":
          initialValues[name] = false;
          break;
        case "Date":
          initialValues[name] = null;
          break;
        case "Unknown":
          initialValues[name] = undefined;
          break;
        default:
          throw new Error(`Unsupported field type: ${type}`);
      }
    });
  
    return initialValues;
  }