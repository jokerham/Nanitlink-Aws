import { Form, Formik, FormikConsumer } from 'formik';
import { EVariant, FormBuilderHandle, IFormBuilderProps, IFormFieldListProps, TFieldSetting } from './types';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { ColumnBox } from 'component/customMui';
import Variant from './formField';
import { Box, Button } from '@mui/material';
import { useState, useRef, useImperativeHandle, forwardRef, Fragment } from 'react';
export * from './types';

const FormFieldList = ({variant, section, showSubmitButton, onValueChanged}: IFormFieldListProps) => {
  return (
    <Fragment>
      <ColumnBox sx={{gap: section.gap ?? '8px', mt: '8px'}}>
        {section.fields.map((fieldSetting, key) => {
          return (
            <FormikConsumer key={key}>
              {({handleChange}) => {
                const enhancedHandleChange = (event: React.ChangeEvent<any>) => {
                  handleChange(event);
                  
                  // ✅ Ensure onValueChanged runs after Formik values are updated
                  setTimeout(() => {
                    onValueChanged?.();
                  }, 0);
                };

                return (
                  <Variant
                    variant={variant}
                    fieldSetting={{
                      ...fieldSetting,
                      onChange: enhancedHandleChange}}/>
                )
              }}
            </FormikConsumer>
          )})}
      </ColumnBox>
      {showSubmitButton &&(
        <Box sx={{textAlign: 'right'}}>
          <Button type="submit" variant="contained" size="small" sx={{
            mt: '10px', mb: '20px'
          }}>Submit</Button>
        </Box>
      )}
    </Fragment>
  )
}

export const FormBuilder = forwardRef<FormBuilderHandle, IFormBuilderProps>(
  ({
    variant: givenVariant, 
    formikConfig, 
    sections: initialSections,
    formRef,
    showSubmitButton,
    onValueChanged
  }: IFormBuilderProps, ref) => {
  const variant = givenVariant || EVariant.Default
  const [sections, setSections] = useState(initialSections);
  const formikRef = useRef<any>(null);

  const addFieldToSection = (sectionIndex: number, newField: TFieldSetting, index?: number) => {
    setSections((prevSections) => 
      prevSections.map((section, idx) => {
        if (idx === sectionIndex) {
          const updatedFields = [...section.fields];
  
          if (index !== undefined && index >= 0 && index < updatedFields.length) {
            updatedFields.splice(index, 0, newField);
          } else {
            updatedFields.push(newField);
          }
  
          return { ...section, fields: updatedFields };
        }
        return section;
      })
    );

    const formik = formikRef.current
    if (formik) {
      formik.setValues({
        ...(formik.values || {}),
        [newField.name]: '',
      });
    }
  };

  const removeFieldFromSection = (sectionIndex: number, fieldName: string) => {
    setSections((prevSections) =>
      prevSections.map((section, index) =>
        index === sectionIndex ? { ...section, fields: section.fields.filter((field) => field.name !== fieldName) } : section
      )
    );
    const formik = formikRef.current;
    if (formik) {
      const updatedValues: { [key: string]: any } = { ...(formik.values || {}) };
      delete updatedValues[fieldName];
      formik.setValues(updatedValues);
    }
  };

  const getField = (fieldName: string) => {
    for (const section of sections) {
      const field = section.fields.find((field) => field.name === fieldName);
      if (field) {
        return field;
      }
    }
    return undefined;
  }

  const getFieldValue = (fieldName: string) => {
    const formik = formikRef.current;
    if (formik) {
      return formik.values[fieldName];
    }
  }

  useImperativeHandle(ref, () => ({
    addFieldToSection,
    removeFieldFromSection,
    getField,
    getFieldValue,
  }));

  return (
    <Formik 
      {...formikConfig}
      enableReinitialize={true}>
        {(formik) => {
          formikRef.current = formik;
          const fieldProps = {
            variant:variant,
            showSubmitButton:showSubmitButton??true,
            onValueChanged: onValueChanged
          }

          return (
            <Form ref={formRef}>
              {sections.map((section, key) => {
                if (section.label) {
                  return (
                    <Section key={key} defaultExpanded={section.expanded ?? false}>
                      <SectionTitle>{ section.label }</SectionTitle>
                      <SectionContent>
                        <FormFieldList section={section} {...fieldProps} />
                      </SectionContent>
                    </Section>
                  )
                } else {
                  return (
                    <FormFieldList key={key} section={section} {...fieldProps} />
                  )
                }
              })}
            </Form>
          )}}
    </Formik>
  )
});