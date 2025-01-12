import { Form, Formik } from 'formik';
import { EVariant, IFormBuilderProps } from './types';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { ColumnBox } from 'component/customMui';
import Variant from './formField';
import { Box, Button } from '@mui/material';
export * from './types';

export const FormBuilder = ({variant: givenVariant, formikConfig, sections}: IFormBuilderProps) => {
  const variant = givenVariant || EVariant.Default

  return (
    <Formik 
      {...formikConfig}
      enableReinitialize={true}>
        {({values}) => (
          <Form>
            {sections.map((section, key) => (
              <Section key={key} defaultExpanded={section.expanded ?? false}>
                <SectionTitle>{ section.label }</SectionTitle>
                <SectionContent>
                  <ColumnBox sx={{gap: 0}}>
                    {section.fields.map((fieldSetting, key) => (
                      <Variant variant={variant} fieldSetting={fieldSetting} />
                    ))}
                  </ColumnBox>
                  <Box sx={{textAlign: 'right'}}>
                    <Button type="submit" variant="contained" size="small" sx={{
                      mt: '10px', mb: '20px'
                    }}>Submit</Button>
                  </Box>
                </SectionContent>
              </Section>
            ))}
          </Form>
        )}
    </Formik>
  )
}