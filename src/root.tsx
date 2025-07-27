import Widget, { Props as WidgetProps } from './components/Widget';
import { useEffect } from 'react';

type CProps = {
  widgetProps: WidgetProps;
  primaryColor?: string;
  messageClientColor?: string;
  messageClientTextColor?: string;
  messageResponseColor?: string;
  messageResponseTextColor?: string;
  anchorBottom?: number | string;
  anchorRight?: number | string;
  anchorMobileBottom?: number | string;
  anchorMobileRight?: number | string;
  headerPaddingTop?: string;
  headerPaddingBottom?: string;
};

function Root({
                widgetProps,
                primaryColor = '#ff9800',
                messageClientColor = '#007FFF',
                messageClientTextColor = '#ffffff',
                messageResponseColor = '#ffffff',
                messageResponseTextColor = '#555555',
                anchorBottom = '20px',
                anchorRight = '20px',
                anchorMobileBottom,
                anchorMobileRight,
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
    anchorBottom && r.style.setProperty('--anchor-bottom', typeof anchorBottom === 'number' ? `${anchorBottom}px` : anchorBottom);
    anchorRight && r.style.setProperty('--anchor-right', typeof anchorRight === 'number' ? `${anchorRight}px` : anchorRight);
    anchorMobileBottom && r.style.setProperty('--anchor-mobile-bottom', typeof anchorMobileBottom === 'number' ? `${anchorMobileBottom}px` : anchorMobileBottom);
    anchorMobileRight && r.style.setProperty('--anchor-mobile-right', typeof anchorMobileRight === 'number' ? `${anchorMobileRight}px` : anchorMobileRight);
  }, [primaryColor, messageClientColor, messageClientTextColor, messageResponseColor, messageResponseTextColor, headerPaddingTop, headerPaddingBottom, anchorBottom, anchorRight]);
  return (
    <Widget
      {...widgetProps}
    />
  );
}

export default Root;
