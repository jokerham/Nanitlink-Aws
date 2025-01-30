import { Form, Formik, FormikConsumer } from 'formik';
import { EVariant, IFormBuilderProps, IFormFieldListProps } from './types';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { ColumnBox } from 'component/customMui';
import Variant from './formField';
import { Box, Button } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
export * from './types';

const FormFieldList = ({variant, section, showSubmitButton, onValueChanged}: IFormFieldListProps) => {
  return (
    <Fragment>
      <ColumnBox sx={{gap: 0}}>
        {section.fields.map((fieldSetting, key) => {
          return (
            <FormikConsumer key={key}>
              {({handleChange}) => {
                const enhancedHandleChange = (event: React.ChangeEvent<any>) => {
                  handleChange(event); // ✅ Update Formik state
                  onValueChanged?.(); // ✅ Trigger additional logic
                };
                const { onChange, ...rest } = fieldSetting;
                const newFieldSetting = {
                  ...rest,
                  onChange: enhancedHandleChange
                }

                return (
                  <Variant key={key} variant={variant} fieldSetting={newFieldSetting}/>
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

export const FormBuilder = ({
  variant: givenVariant, 
  formikConfig, 
  sections,
  formRef,
  showSubmitButton,
  onValueChange
}: IFormBuilderProps) => {
  const variant = givenVariant || EVariant.Default

  return (
    <Formik 
      {...formikConfig}
      enableReinitialize={true}>
        {({values}) => {
          const fieldProps = {
            variant:variant,
            showSubmitButton:showSubmitButton??true,
            onValueChanged: () =>{
              onValueChange?.(values);
            }
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
}