import { Form, Formik } from 'formik';
import { EVariant, IFormBuilderProps } from './types';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { ColumnBox } from 'component/customMui';
import Variant from './formField';
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
              <Section key={key}>
                <SectionTitle>{ section.label }</SectionTitle>
                <SectionContent>
                  <ColumnBox>
                    {section.fields.map((fieldSetting, key) => (
                      <Variant variant={variant} fieldSetting={fieldSetting}/>
                    ))}
                  </ColumnBox>
                </SectionContent>
              </Section>
            ))}
          </Form>
        )}
    </Formik>
  )
}