import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const HorizontalBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const RowBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
}));

export const ColumnBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const TitleBox = styled(Box)(({ theme }) => ({
  borderBottom: '2px solid #ddd',
  marginBottom: '24px',
  height: '34px',
  width: '100%',
}));

export const CenterRowBox = styled(RowBox)(({ theme }) => ({
  alignItems: 'center',
}));
