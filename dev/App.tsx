import React, { Component } from 'react';

import { addResponseMessage, setMessageStatus, setQuickButtons, toggleInputDisabled, toggleMsgLoader } from '@actions';
import Widget from '../src/root';
import { setResponseUser } from '../src';

const doopageIcon = require('@assets/doopage-icon.png') as string;

export default class App extends Component {
  componentDidMount() {
    // addResponseMessage('Livechat của DooPage, siêu xịn sò ^^');
    // addLinkSnippet({ link: 'https://doopage.com', title: 'DooPage' });
    // addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    // addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
    addResponseMessage('Xin chào :D');
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
      avatar: 'https://cdn-icons-png.flaticon.com/512/5277/5277459.png',
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
                profileAvatar: 'https://cdn-icons-png.flaticon.com/512/5277/5277459.png'
                // profileClientAvatar: 'https://cdn-icons-png.flaticon.com/512/5277/5277459.png'
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
            },
            imagePreview: true
          },
          handleNewUserMessage: this.handleNewUserMessage,
          handleQuickButtonClicked: this.handleQuickButtonClicked,
          disableRichTextInput: true,
          handleSubmit: this.handleSubmit,
          onResize: (w, h) => {
            console.log('@@@Resize', w, h);
          }
        }}
      />
    );
  }
}
