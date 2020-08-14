import Enum from 'utils/Enum';

export const OrderStatus = new Enum(
  { alias: 'TO_BE_AUDITED', text: '待审核', value: 1 },
  { alias: 'AUDITED', text: '已通过', value: 2 },
  { alias: 'DISMISSIAL', text: '已驳回', value: 3 },
);