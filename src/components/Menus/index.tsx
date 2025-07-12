import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Position } from '@utils/types';
import { ContextMenuItem } from '@types';
import './styles.scss';
import Img from '@components/Img';

export interface Props {
  items: ContextMenuItem[];
  position: Position | HTMLElement;
  data?: any;
  onClose?: () => void;
}

export default function Menus({ items, position, data, onClose }: Props) {
  const isPositionByEl = position instanceof HTMLElement;

  const handleClick = (next?: (data: any) => void) => (ev) => {
    ev.preventDefault();
    onClose?.();
    next?.(data);
  };

  return (
    <Menu
      open
      className="rcw-menus"
      anchorReference={isPositionByEl ? 'anchorEl' : 'anchorPosition'}
      anchorEl={isPositionByEl ? position : undefined}
      anchorPosition={isPositionByEl ? undefined : { left: position?.x, top: position?.y }}
      elevation={1}
      onClose={onClose}
    >
      {items.map((item, i) => {
        if (item == 'divider') {
          return <Divider sx={{ my: 0.5 }} key={i} />;
        }
        const { icon, label, onClick } = item;
        return <MenuItem key={i} onClick={handleClick(onClick)}>
          {icon && <Img src={icon} />}
          {label}
        </MenuItem>;
      })}
    </Menu>
  );
}
