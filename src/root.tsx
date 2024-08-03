import Widget, { Props as WidgetProps } from './components/Widget';
import { useEffect } from 'react';

type CProps = {
  widgetProps: WidgetProps;
  primaryColor?: string;
  messageClientColor?: string;
  messageClientTextColor?: string;
  messageResponseColor?: string;
  messageResponseTextColor?: string;
  headerPaddingTop?: string;
  headerPaddingBottom?: string;
};

function Root({
                widgetProps,
                primaryColor = '#ff9800',
                messageClientColor = '#2979ff',
                messageClientTextColor = '#ffffff',
                messageResponseColor = '#ffffff',
                messageResponseTextColor = '#555555',
                headerPaddingTop,
                headerPaddingBottom
              }: CProps) {
  useEffect(() => {
    const r = document.querySelector(':root') as HTMLHtmlElement;
    primaryColor && r.style.setProperty('--primary-color', primaryColor);
    messageClientColor && r.style.setProperty('--message-client-color', messageClientColor);
    messageClientTextColor && r.style.setProperty('--message-client-text-color', messageClientTextColor);
    messageResponseColor && r.style.setProperty('--message-response-color', messageResponseColor);
    messageResponseTextColor && r.style.setProperty('--message-response-text-color', messageResponseTextColor);
    headerPaddingTop && r.style.setProperty('--header-padding-top', headerPaddingTop);
    headerPaddingBottom && r.style.setProperty('--header-padding-bottom', headerPaddingBottom);
  }, [primaryColor, messageClientColor, messageClientTextColor, messageResponseColor, messageResponseTextColor, headerPaddingTop, headerPaddingBottom]);
  return (
    <Widget
      {...widgetProps}
    />
  );
}

export default Root;
