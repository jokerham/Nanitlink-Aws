import { ReactNode, RefCallback, RefObject } from 'react';
import { MenuTab, MenuTabHeader, MenuTabTitle, MenuTabContent, MenuTabAction, CloseIcon } from './Components';
import { Link } from '@mui/material';
import { NavLink } from 'react-router';
import { TGeneralFunction } from './types';

interface ITabProps {
  width?: number;
  title: string;
  titleIcon?: ReactNode;
  titleIconHref?: string;
  titleIconAction?: TGeneralFunction;
  headerComponent?: ReactNode;
  contentComponent: ReactNode;
  actionComponent?: ReactNode;
  ref?: RefObject<Element>;
  onClose?: TGeneralFunction;
}

const Tab = ({
  width,
  title,
  titleIcon,
  titleIconHref,
  titleIconAction,
  headerComponent,
  contentComponent,
  actionComponent,
  ref,
  onClose,
}: ITabProps) => {
  return (
    <MenuTab style={{ width: width ?? 255 }}>
      <MenuTabHeader>
        <MenuTabTitle>
          {title}
          {titleIcon && titleIconHref && (
            <Link component={NavLink} to={titleIconHref}>
              {titleIcon}
            </Link>
          )}
          {titleIcon && titleIconAction && (
            <Link onClick={titleIconAction}>{titleIcon}</Link>
          )}
        </MenuTabTitle>
        {onClose && (
          <CloseIcon onClick={onClose} />
        )}
      </MenuTabHeader>
      {headerComponent}
      <MenuTabContent ref={ref}>{contentComponent}</MenuTabContent>
      <MenuTabAction>{actionComponent}</MenuTabAction>
    </MenuTab>
  );
};

export default Tab;
