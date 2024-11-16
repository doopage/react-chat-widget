import { format, intlFormatDistance } from 'date-fns';

export const format_time = (time: Date, locale?: string): string => {
  const days = (Date.now() - time.getTime()) / 1000 / 60 / 60 / 24;
  if (days < 30) {
    return intlFormatDistance(time, new Date(), { locale });
  }
  let fmt = 'hh:mm, dd MMM';
  if (days > 365) {
    fmt += ', yyyy';
  }
  return format(time, fmt);
};
