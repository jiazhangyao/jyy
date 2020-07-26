import Enum from 'utils/Enum';

export const MailType = new Enum(
  { alias: 'EMS', text: 'EMS', value: 2 },
);
export const mailState = new Enum(
  { alias: '待揽件', text: '待揽件', value: 1 },
  { alias: '已揽件', text: '已揽件', value: 2 },
  { alias: '邮寄中', text: '邮寄中', value: 3 },
  { alias: '已签收', text: '已签收', value: 4 },
)