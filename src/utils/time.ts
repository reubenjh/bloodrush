import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const fromNow = (timestamp: Date) => {
  console.log(timestamp);
  return dayjs(timestamp).fromNow();
};
