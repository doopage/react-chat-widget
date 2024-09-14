import React, { Component } from 'react';

import Widget from '../src/root';

export default class Simple extends Component {
  render() {
    return (
      <Widget
        widgetProps={{
          handleToggle: (isOpened: boolean): boolean => {
            alert('Show error');
            return false;
          }
        }}
        anchorBottom={120}
        anchorRight={120}
      />
    );
  }
}
