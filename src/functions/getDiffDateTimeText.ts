import moment from 'moment';

export const getDiffDateTimeText = ({ updatedDate }) => {
  if ( !updatedDate ) {
    return '';
  }
  const currentDate = moment(); // 現在の日付
  const daysDiff = currentDate.diff(updatedDate, 'days');

  if (daysDiff !== 0) {
    return `${daysDiff}日前に更新`;
  }

  const hoursDiff = currentDate.diff(updatedDate, 'hours');
  if (hoursDiff !== 0) {
    return `${hoursDiff}時間前に更新`;
  }

  const minitusDiff = currentDate.diff(updatedDate, 'minitus');
  if (hoursDiff !== 0) {
    return `${minitusDiff}分前に更新`;
  }
  return '数秒前に更新';

};
