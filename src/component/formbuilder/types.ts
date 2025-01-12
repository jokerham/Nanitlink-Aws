import { FieldInputProps, FormikConfig, FormikValues } from "formik";

export enum EVariant {
  Default,
  LabelOnLeft,
}

export enum EFieldType {
  TextField,
  Password,
  TextArea,
  Select,
  Radio,
  Checkbox,
  Date,
  Time,
  DateTime,
  File,
  Hidden,
  Custom
}

export type TSection = {
  seq: number,
  label?: string,
  fields: TFieldSetting[],
  expanded?: boolean
}

export type TOptionItem = {
  value: string
  label: string
}

interface IBaseFieldSetting extends FieldInputProps<FormikValues> {
  label: string
}

export interface ITextFieldSetting extends IBaseFieldSetting {
  type: 
    EFieldType.TextField | 
    EFieldType.TextArea |
    EFieldType.File |
    EFieldType.Custom |
    EFieldType.Hidden;
}

export interface IOptionFieldSetting extends IBaseFieldSetting {
  type: EFieldType.Select | EFieldType.Radio | EFieldType.Checkbox
  options: {
    multiple?: boolean;
    hasNone?: boolean;
    hasAll?: boolean;
    sort?: boolean;
    data: TOptionItem[];
  }
}

export interface ICustomFieldSetting extends IBaseFieldSetting {
  type: EFieldType.Custom
  options: {
    Component: React.ComponentType<unknown>
  }
}

export type TFieldSetting = 
  ITextFieldSetting |
  IOptionFieldSetting |
  ICustomFieldSetting;

export interface IFormBuilderProps {
  variant: EVariant,
  formikConfig: FormikConfig<FormikValues>
  sections: TSection[]
}

export interface IFormFieldProps {
  variant?: EVariant
  fieldSetting: TFieldSetting
}

export interface IAttachment {
  fileName: string
  fileSize: number
  fileType: string
  keyPath: string
  signedUrl?: string
  file: Blob
}