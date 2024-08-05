import React, { Component } from 'react';

import './App.scss';

import { addResponseMessage, addSystemMessage, addToggleChatListener, setMessageStatus, setPopupMessage, setQuickButtons, toggleInputDisabled, toggleMsgLoader } from '@actions';
import Widget from '../src/root';
import { setResponseUser } from '../src';

const doopageIcon = require('@assets/doopage-icon.png') as string;

export default class App extends Component {
  componentDidMount() {
    addToggleChatListener((state) => console.log('@@@ addToggleChatListener', state));

    setPopupMessage('Chào mừng\n'.repeat(1));

    // addResponseMessage('Livechat của DooPage, siêu xịn sò ^^');
    // addLinkSnippet({ link: 'https://doopage.com', title: 'DooPage' });
    // addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    // addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
    addResponseMessage('Xin chào :D');
    addSystemMessage(
      'Bất cứ lúc nào, bạn có thể tiếp tục hội thoại ở đây: ' +
      '![](https://s3.amazonaws.com/upload.uxpin/files/793532/789453/image-722b79b6cde920eab2c2c83f742f7f10-6ee28a.png =110x110){.no-response-qr}' +
      `*hoặc*{.no-response-text-center}` +
      '![](https://s3.amazonaws.com/upload.uxpin/files/793532/789453/image-538a05b9ed235f80cf4245a0c8379263-cc48e4.png =110x110){.no-response-qr}'
    );
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
    toggleInputDisabled();
    setResponseUser({
      avatar: 'https://doopage-dev.s3.amazonaws.com/media/image/avatar/b369b63252b44f77b63d.jpeg',
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
                profileAvatar: 'https://doopage-dev.s3.amazonaws.com/media/image/avatar/b369b63252b44f77b63d.jpeg',
                profileClientAvatar: 'https://doopage-dev.s3.amazonaws.com/media/image/avatar/b369b63252b44f77b63d.jpeg'
              },
              senderProps: {
                placeholder: 'Escribe aquí ...'
              },
              resizable: true,
              resizableProps: { heightOffset: 105, widthOffset: 35 },
              emojis: true,
              files: true
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
      />
    );
  }
}
