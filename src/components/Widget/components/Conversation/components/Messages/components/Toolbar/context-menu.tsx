import './styles.scss';
import { Item, Menu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import React from 'react';

export const MenuId = 'messages_context_menu';

export function ContextMenu() {
  return (
    <Menu id={MenuId}>
      <Item>Copy</Item>
      <Item>Cut</Item>
    </Menu>
  );
}

export default ContextMenu;
