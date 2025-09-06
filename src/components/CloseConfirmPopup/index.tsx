import './style.scss';
import React from 'react';

function CloseConfirmPopup({ children }: React.PropsWithChildren) {
  return <div className="rcw-close-confirm-popup">
    <div className="close">
      <div className="btn">&times;</div>
    </div>
    {children}
  </div>;
}

export default CloseConfirmPopup;
