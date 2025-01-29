import { FieldInputProps, FormikConfig, FormikHandlers, FormikValues } from "formik";
import { Ref } from "react";

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

export type FieldInputPropsWithoutHandlers<Value> = Omit<FieldInputProps<Value>, 'value' | 'onChange' | 'onBlur'>;

interface IBaseFieldSetting extends FieldInputPropsWithoutHandlers<FormikValues> {
  label: string
  value?: FormikValues
  onChange?: FormikHandlers['handleChange'];
  onBlur?: FormikHandlers['handleBlur'];
}

export interface ITextFieldSetting extends IBaseFieldSetting {
  type: 
    EFieldType.TextField | 
    EFieldType.TextArea |
    EFieldType.Custom |
    EFieldType.Hidden;
  multiline?: boolean
  rows?: number
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

export type TFileInfo = {
  fileName: string
  fileSize: number
  filePath: string
  isLocal: boolean
  file: Blob
}

export interface IFileFieldSetting extends IBaseFieldSetting {
  type: EFieldType.File
  options: {
    multiple: boolean;
    files?: TFileInfo[];
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
  IFileFieldSetting |
  ICustomFieldSetting;

export interface IFormBuilderProps {
  variant: EVariant,
  formikConfig: FormikConfig<FormikValues>
  sections: TSection[]
  formRef?: Ref<HTMLFormElement>
  showSubmitButton?: boolean
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

export interface IFormFieldListProps {
  variant: EVariant,
  section: TSection,
  showSubmitButton: boolean
}