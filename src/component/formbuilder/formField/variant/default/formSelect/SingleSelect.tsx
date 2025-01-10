import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TFieldSetting, IOptionFieldSetting } from 'component/formbuilder/types'
import { Field } from 'formik';

export const SingleSelect = (props: TFieldSetting) => {
  const fieldSetting = props as IOptionFieldSetting;
  const { label, name, options } = fieldSetting;
  const { data = [], hasAll = false, hasNone = false } = options;
  return (
    <FormControl>
      {label && 
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
      }
      <Field as={Select} {...props}>
        { hasNone &&
          <MenuItem value="">None</MenuItem>}
        { hasAll &&
          <MenuItem value="all">All</MenuItem>}
        {data.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Field>
    </FormControl>
  )
}
