import React, { Component } from 'react';

import './App.scss';
import Widget from '../src/root';

export default class Popup extends Component {
  render() {
    return (
      <Widget
        widgetProps={{
          layoutProps: {
            conversationProps: {
              headerProps: {
                title: 'DooPage ABC',
                subtitle: 'Livechat',
                showCloseButton: false,
              },
              messagesProps: {
                profileAvatar: 'https://gravatar.com/avatar/a6b4011d2aa73154e225faa999e252ae3f2d7489819e8c04324549850712d6f7?size=512',
                profileClientAvatar: 'https://gravatar.com/avatar/a6b4011d2aa73154e225faa999e252ae3f2d7489819e8c04324549850712d6f7?size=512'
              },
              senderProps: {
                placeholder: 'Escribe aquí ...'
              },
              resizable: true,
              resizableProps: { heightOffset: 105, widthOffset: 35 },
              emojis: true,
              files: true,
              copyright: '&copy; 2024 LiveChat, Inc. All rights reserved.'
            },
            launcherProps: {
              // openImg: doopageIcon
              popupProps: {
                onResize: (w, h) => {
                  console.log('@@@popup resize', [w, h]);
                }
              }
            },
            imagePreview: true,
            fullScreenMode: true,
          },
          disableRichTextInput: true
        }}
        anchorBottom={120}
        anchorRight={120}
      />
    );
  }
}
