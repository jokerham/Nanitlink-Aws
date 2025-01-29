import { Form, Formik } from 'formik';
import { EVariant, IFormBuilderProps, IFormFieldListProps } from './types';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { ColumnBox } from 'component/customMui';
import Variant from './formField';
import { Box, Button } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
export * from './types';

const FormFieldList = ({variant, section, showSubmitButton}: IFormFieldListProps) => {
  return (
    <Fragment>
      <ColumnBox sx={{gap: 0}}>
        {section.fields.map((fieldSetting, key) => (
          <Variant key={key} variant={variant} fieldSetting={fieldSetting} />
        ))}
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

export const FormBuilder = ({
  variant: givenVariant, 
  formikConfig, 
  sections,
  formRef,
  showSubmitButton
}: IFormBuilderProps) => {
  const variant = givenVariant || EVariant.Default
  return (
    <Formik 
      {...formikConfig}
      enableReinitialize={true}>
        {({values}) => (
          <Form ref={formRef}>
            {sections.map((section, key) => {
              if (section.label) {
                return (
                  <Section key={key} defaultExpanded={section.expanded ?? false}>
                    <SectionTitle>{ section.label }</SectionTitle>
                    <SectionContent>
                      <FormFieldList variant={variant} section={section} showSubmitButton={showSubmitButton??true} />
                    </SectionContent>
                  </Section>
                )
              } else {
                return (
                  <FormFieldList variant={variant} section={section} showSubmitButton={showSubmitButton??true} />
                )
              }
            })}
          </Form>
        )}
    </Formik>
  )
}