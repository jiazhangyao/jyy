import Enum from "utils/Enum";

export const BusinessStatuses = new Enum(
  { alias: "二手房买卖登记", text: "二手房买卖登记", value: 1 },
  { alias: "抵押权设立登记 ", text: "抵押权设立登记", value: 2 },
  { alias: "商品房转移登记", text: "商品房转移登记", value: 3 },
  { alias: "抵押权注销登记", text: "抵押权注销登记", value: 4 },
  { alias: "商品房预告登记", text: "商品房预告登记", value: 5 },
  { alias: "商品房预抵押登记", text: "商品房预抵押登记", value: 6 },
  {
    alias: "商品房预告登记+商品房预抵押登记 ",
    text: "商品房预告登记+商品房预抵押登记",
    value: 7
  },
  {
    alias: "商品房转移登记+抵押权设立登记",
    text: "商品房转移登记+抵押权设立登记",
    value: 8
  },
  {
    alias: "二手房买卖登记+抵押权设立登记",
    text: "二手房买卖登记+抵押权设立登记",
    value: 9
  },
  { alias: "商品房首次登记", text: "商品房首次登记", value: 10 },
  { alias: "房产注销登记", text: "房产注销登记", value: 11 }
);
export const FlagStatuses = new Enum(
  { alias: "已预约", text: "已预约", value: 1 },
  { alias: "已取消 ", text: "已取消", value: 2 }
);
