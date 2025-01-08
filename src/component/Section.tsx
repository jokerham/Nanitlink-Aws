import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from "@mui/material"
import { BiSolidDownArrow } from "react-icons/bi";

const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  marginBottom: '24px',
  '&::before': {
    display: 'none', // Remove the top line
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
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
    }
  },
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: 0,
});

export const Section = ({ children, defaultExpanded }: { children: React.ReactNode, defaultExpanded?: boolean }) => {
  if (children === undefined || children === null) return (<></>);
  return (
      <StyledAccordion defaultExpanded={defaultExpanded}>
        { children }
      </StyledAccordion>
  )
}
export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledAccordionSummary expandIcon={<BiSolidDownArrow />}>
      <Typography variant="h2">{children}</Typography>
    </StyledAccordionSummary>
  )
}
export const SectionContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledAccordionDetails>
      {children}
    </StyledAccordionDetails>
  )
}