import { Form, Formik } from 'formik';
import { EVariant, IFormBuilderProps, TSection } from './types';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { ColumnBox } from 'component/customMui';
import Variant from './formField';
import { Box, Button } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
export * from './types';

interface IFormFieldListProps {
  variant: EVariant,
  section: TSection
}

const FormFieldList = ({variant, section}: IFormFieldListProps) => {
  return (
    <Fragment>
      <ColumnBox sx={{gap: 0}}>
        {section.fields.map((fieldSetting, key) => (
          <Variant key={key} variant={variant} fieldSetting={fieldSetting} />
        ))}
      </ColumnBox>                  
      <Box sx={{textAlign: 'right'}}>
        <Button type="submit" variant="contained" size="small" sx={{
          mt: '10px', mb: '20px'
        }}>Submit</Button>
      </Box>
    </Fragment>
  )
}

export const FormBuilder = ({variant: givenVariant, formikConfig, sections}: IFormBuilderProps) => {
  const variant = givenVariant || EVariant.Default

  return (
    <Formik 
      {...formikConfig}
      enableReinitialize={true}>
        {({values}) => (
          <Form>
            {sections.map((section, key) => {
              if (section.label) {
                return (
                  <Section key={key} defaultExpanded={section.expanded ?? false}>
                    <SectionTitle>{ section.label }</SectionTitle>
                    <SectionContent>
                      <FormFieldList variant={variant} section={section} />
                    </SectionContent>
                  </Section>
                )
              } else {
                return (
                  <FormFieldList variant={variant} section={section} />
                )
              }
            })}
          </Form>
        )}
    </Formik>
  )
}