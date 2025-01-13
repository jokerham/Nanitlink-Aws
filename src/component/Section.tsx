import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from "@mui/material"
import { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { BiSolidDownArrow } from "react-icons/bi";

export const Section = styled(Accordion)({
  boxShadow: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  marginBottom: '24px',
  '&::before': {
    display: 'none', // Remove the top line
  },
});

interface SectionTitleProps extends AccordionSummaryProps {
  children: React.ReactNode;
}

export const SectionTitle = styled((props: SectionTitleProps) => (
  <AccordionSummary
    expandIcon={<BiSolidDownArrow />}
    {...props}
  >
    <Typography variant="h2">{props.children}</Typography>
  </AccordionSummary>
))(({ theme }) => ({
  padding: 0,
  borderBottom: '1px solid #ccc',
  minHeight: 'unset',
  '&.Mui-expanded': {
    minHeight: 'unset',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
}));

export const SectionContent = styled(AccordionDetails)({
  padding: '5px 0 0 0',
});
