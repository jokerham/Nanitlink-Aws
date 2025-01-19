import { IFileFieldSetting, TFieldSetting } from 'component/formbuilder/types';
import { Multiple } from './Multiple';
import { Single } from './Single';

export const FormFile = (props: TFieldSetting) => {
  const fileProps = props as IFileFieldSetting;
  return (
    (fileProps.options?.multiple ?
      <Multiple {...fileProps}/> :
      <Single {...fileProps}/>
    )
  );
};