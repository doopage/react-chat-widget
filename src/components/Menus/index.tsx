import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Position } from '@utils/types';
import { ContextMenuItem } from '@types';
import './styles.scss';

export interface Props {
  items: ContextMenuItem[];
  position: Position;
  data?: any;
  onClose?: () => void;
}

export default function Menus({ items, position, data, onClose }: Props) {
  const handleClick = (next?: (data: any) => void) => (ev) => {
    ev.preventDefault();
    onClose?.();
    next?.(data);
  };

  return (
    <Menu
      open
      className="rcw-menus"
      anchorReference="anchorPosition"
      anchorPosition={{ left: position?.x, top: position?.y }}
      elevation={1}
      onClose={onClose}
    >
      {items.map((item, i) => {
        if (item == 'divider') {
          return <Divider sx={{ my: 0.5 }} />;
        }
        const { icon, label, onClick } = item;
        return <MenuItem key={i} onClick={handleClick(onClick)}>
          {icon && <img src={icon} />}
          {label}
        </MenuItem>;
      })}
    </Menu>
  );
}
