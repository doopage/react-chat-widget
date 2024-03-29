import Widget, { Props as WidgetProps } from './components/Widget';
import { useEffect } from 'react';
import { Optional } from 'utility-types';

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


const defaultProps = {
  primaryColor: '#ff9800',
  messageClientColor: '#2979ff',
  messageClientTextColor: '#ffffff',
  messageResponseColor: '#f1f0f0',
  messageResponseTextColor: '#555555'
};

type IProps = CProps & typeof defaultProps;
export type Props = Optional<CProps, keyof typeof defaultProps>;

function Root({
                widgetProps,
                primaryColor,
                messageClientColor,
                messageClientTextColor,
                messageResponseColor,
                messageResponseTextColor,
                headerPaddingTop,
                headerPaddingBottom
              }: IProps) {
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

Root.defaultProps = defaultProps;

export default Root;
