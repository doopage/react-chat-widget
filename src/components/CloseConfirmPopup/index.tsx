import './style.scss';
import React from 'react';

export interface Props {
  children?: React.ReactNode;
  onClose?: () => void;
}

function CloseConfirmPopup({ children, onClose }: Props) {
  return <div className="rcw-close-confirm-popup">
    <div className="close" onClick={onClose}>
      <div className="btn">&times;</div>
    </div>
    {children}
  </div>;
}

export default CloseConfirmPopup;
