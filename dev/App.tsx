import React, { Component } from 'react';

import './App.scss';

import { addResponseMessage, addSystemMessage, addToggleChatListener, setMessageStatus, setPopupMessage, setQuickButtons, toggleInputDisabled, toggleMsgLoader } from '@actions';
import Widget from '../src/root';
import { setResponseUser } from '../src';
import { ref } from 'valtio';
import Custom from '../src/components/Widget/components/Conversation/components/Messages/components/Custom';

const doopageIcon = require('@assets/doopage-icon.png') as string;

export default class App extends Component {
  componentDidMount() {
    addToggleChatListener((state) => console.log('@@@ addToggleChatListener', state));

    setPopupMessage([
      'Chào mừng A\n'.repeat(100),
      'Chào mừng B\n'.repeat(1),
      'Chào mừng C\n'.repeat(1)
    ]);

    // addResponseMessage('Livechat của DooPage, siêu xịn sò ^^');
    // addLinkSnippet({ link: 'https://doopage.com', title: 'DooPage' });
    // addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    // addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
    addResponseMessage('Xin chào :D');
    addSystemMessage('ABC', {}, { component: ref(Custom) });
  }

  handleNewUserMessage = ({ id, text, files }: any) => {
    setTimeout(() => setMessageStatus(id, 'sent'), 1000);
    setTimeout(() => setMessageStatus(id, 'read'), 2000);
    setTimeout(() => toggleMsgLoader(), 3000);
    setTimeout(() => {
      toggleMsgLoader();
      if (text === 'menu') {
        setQuickButtons([{ label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' }]);
      } else {
        addResponseMessage(text, { props: { files } });
      }
      toggleInputDisabled();
    }, 5000);
  };

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  };

  handleSubmit = async ({ text, files }: any) => {
    if (text == 'hi' && (!files || files.length <= 0)) {
      return new Error('Uh oh, please write a bit more.');
    }
    if (text == 'avatars') {
      setResponseUser({
        avatar: [
          'https://gravatar.com/avatar/a6b4011d2aa73154e225faa999e252ae3f2d7489819e8c04324549850712d6f7?size=512',
          'https://gravatar.com/avatar/a6b4011d2aa73154e225faa999e252ae3f2d7489819e8c04324549850712d6f7?size=512',
          'https://gravatar.com/avatar/a6b4011d2aa73154e225faa999e252ae3f2d7489819e8c04324549850712d6f7?size=512'
        ],
        name: 'Coffee Coding',
        message: '3 người đang online'
      });
      return;
    }
    toggleInputDisabled();
    setResponseUser({
      avatar: 'https://gravatar.com/avatar/a6b4011d2aa73154e225faa999e252ae3f2d7489819e8c04324549850712d6f7?size=512',
      name: 'Chien Nguyen',
      message: 'Trực tuyến',
      online: Math.random() < .5
    });
  };

  render() {
    return (
      <Widget
        widgetProps={{
          layoutProps: {
            conversationProps: {
              headerProps: {
                title: 'DooPage ABC',
                subtitle: 'Livechat'
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
            imagePreview: true
          },
          handleNewUserMessage: this.handleNewUserMessage,
          handleQuickButtonClicked: this.handleQuickButtonClicked,
          disableRichTextInput: true,
          handleSubmit: this.handleSubmit,
          handleToggle: async (isOpened: boolean): Promise<boolean> => {
            console.log('@@@handleToggle', isOpened);
            if (isOpened) {
              await new Promise(done => setTimeout(done, 1500));
            }
            return true;
          },
          onResize: (w, h) => {
            console.log('@@@Resize', w, h);
          }
        }}
        anchorBottom={120}
        anchorRight={120}
      />
    );
  }
}
