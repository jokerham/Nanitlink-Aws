import { Typography } from '@mui/material';
import { ColumnBox, RowBox } from 'component/customMui';
import React from 'react';
import { IMenu } from './types';
import { sxStyles } from './styles';

const EditForm: React.FC<{ node: IMenu }> = ({ node }) => {
  return (
    <ColumnBox sx={sxStyles.edit}>
      <RowBox sx={sxStyles.header}>
        <Typography variant='h1' sx={sxStyles.h1}>
          General Setting
        </Typography>
      </RowBox>
      <ColumnBox sx={sxStyles.content}>
      </ColumnBox>
    </ColumnBox>
  );
};

export default EditForm;