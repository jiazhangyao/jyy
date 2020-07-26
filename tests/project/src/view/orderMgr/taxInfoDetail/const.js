import React from 'react';
const textFieldRender = (value) => (<span>{value || '--'}</span>);

export const ratePayInfo = [
  {
    title: '角色',
    dataIndex: 'typeDesc',
    key: 'typeDesc',
    render: textFieldRender
  },
  {
    title: '印花税',
    dataIndex: 'stampDutyTax',
    key: 'stampDutyTax',
    render: textFieldRender
  },
  {
    title: '契税',
    dataIndex: 'deedTax',
    key: 'deedTax',
    render: textFieldRender
  },
  {
    title: '数额合计',
    dataIndex: 'sum',
    key: 'sum',
    render: textFieldRender
  },
]
export const fsTit = [
  {
    title: '登记费',
    dataIndex: 'registerFee',
    key: 'registerFee',
    render: textFieldRender
  },
  {
    title: '工本费',
    dataIndex: 'cost',
    key: 'cost',
    render: textFieldRender
  },
  {
    title: '土地出让金',
    dataIndex: 'price',
    key: 'price',
    render: textFieldRender
  },
  {
    title: '维修资金',
    dataIndex: 'maintainCapital',
    key: 'maintainCapital',
    render: textFieldRender
  },
  {
    title: '数额合计',
    dataIndex: 'total',
    key: 'total',
    render: textFieldRender
  }
]
export const ratePayTit = [
  {
    title: '角色',
    dataIndex: 'typeDesc',
    key: 'typeDesc',
    render: (value, item) => {
      return item.type === 1 ? '义务人' : item.type === 2 ? '权利人' : '--';
    }
  },
  {
    title: '个税',
    dataIndex: 'incomeTax',
    key: 'incomeTax',
    render: textFieldRender
  },
  {
    title: '增值税',
    dataIndex: 'vat',
    key: 'vat',
    render: textFieldRender
  },
  {
    title: '城市维护建设税',
    dataIndex: 'buildingTax',
    key: 'buildingTax',
    render: textFieldRender
  },
  {
    title: '印花税',
    dataIndex: 'stampDutyTax',
    key: 'stampDutyTax',
    render: textFieldRender
  },
  {
    title: '土地增值税',
    dataIndex: 'landVat',
    key: 'landVat',
    render: textFieldRender
  },
  {
    title: '教育税附加',
    dataIndex: 'educationSurtax',
    key: 'educationSurtax',
    render: textFieldRender
  },
  {
    title: '地方教育附加',
    dataIndex: 'localEducationSurtax',
    key: 'localEducationSurtax',
    render: textFieldRender
  },
  {
    title: '契税',
    dataIndex: 'deedTax',
    key: 'deedTax',
    render: textFieldRender
  },
  {
    title: '数额合计',
    dataIndex: 'sum',
    key: 'sum',
    render: textFieldRender
  },
];
export const obligeeBuyerTit = [
  {
    title: '纳税人名称',
    dataIndex: 'memberName',
    key: 'memberName',
    render: textFieldRender
  },
  {
    title: '征收项目',
    dataIndex: 'taxTypeText',
    key: 'taxTypeText',
    render: textFieldRender
  },
  {
    title: '征收品目',
    dataIndex: 'collectItem',
    key: 'collectItem',
    render: textFieldRender
  },
  {
    title: '征收子目',
    dataIndex: 'collectSubheading',
    key: 'collectSubheading',
    render: textFieldRender
  },
  {
    title: '税款所属期起',
    dataIndex: 'taxStartDate',
    key: 'taxStartDate',
    render: textFieldRender
  },
  {
    title: '税款所属期止',
    dataIndex: 'taxExpairedDate',
    key: 'taxExpairedDate',
    render: textFieldRender
  },
  {
    title: '应税项',
    dataIndex: 'taxLiability',
    key: 'taxLiability',
    render: textFieldRender
  },
  {
    title: '扣除项',
    dataIndex: 'taxDeduction',
    key: 'taxDeduction',
    render: textFieldRender
  },
  {
    title: '应税所得率',
    dataIndex: 'taxLiabilityRate',
    key: 'taxLiabilityRate',
    render: textFieldRender
  },
  {
    title: '计税依据',
    dataIndex: 'taxBasis',
    key: 'taxBasis',
    render: textFieldRender
  },
  {
    title: '税率（征收率）',
    dataIndex: 'taxRate',
    key: 'taxRate',
    render: textFieldRender
  },
  {
    title: '速算扣除数',
    dataIndex: 'quickDeduction',
    key: 'quickDeduction',
    render: textFieldRender
  },
  {
    title: '应纳税额',
    dataIndex: 'taxPayable',
    key: 'taxPayable',
    render: textFieldRender
  },
  {
    title: '减免性质',
    dataIndex: 'taxExemptionNature',
    key: 'taxExemptionNature',
    render: textFieldRender
  },
  {
    title: '减免税额',
    dataIndex: 'taxExemption',
    key: 'taxExemption',
    render: textFieldRender
  },
  {
    title: '本期应补（退）税额',
    dataIndex: 'sum',
    key: 'sum',
    render: textFieldRender
  },
];
export const obligorSellerTit = [
  {
    title: '纳税人名称',
    dataIndex: 'memberName',
    key: 'memberName',
    render: textFieldRender
  },
  {
    title: '征收项目',
    dataIndex: 'taxTypeText',
    key: 'taxTypeText',
    render: textFieldRender
  },
  {
    title: '征收品目',
    dataIndex: 'collectItem',
    key: 'collectItem',
    render: textFieldRender
  },
  {
    title: '征收子目',
    dataIndex: 'collectSubheading',
    key: 'collectSubheading',
    render: textFieldRender
  },
  {
    title: '税款所属期起',
    dataIndex: 'taxStartDate',
    key: 'taxStartDate',
    render: textFieldRender
  },
  {
    title: '税款所属期止',
    dataIndex: 'taxExpairedDate',
    key: 'taxExpairedDate',
    render: textFieldRender
  },
  {
    title: '应税项',
    dataIndex: 'taxLiability',
    key: 'taxLiability',
    render: textFieldRender
  },
  {
    title: '扣除项',
    dataIndex: 'taxDeduction',
    key: 'taxDeduction',
    render: textFieldRender
  },
  {
    title: '应税所得率',
    dataIndex: 'taxLiabilityRate',
    key: 'taxLiabilityRate',
    render: textFieldRender
  },
  {
    title: '计税依据',
    dataIndex: 'taxBasis',
    key: 'taxBasis',
    render: textFieldRender
  },
  {
    title: '税率（征收率）',
    dataIndex: 'taxRate',
    key: 'taxRate',
    render: textFieldRender
  },
  {
    title: '速算扣除数',
    dataIndex: 'quickDeduction',
    key: 'quickDeduction',
    render: textFieldRender
  },
  {
    title: '应纳税额',
    dataIndex: 'taxPayable',
    key: 'taxPayable',
    render: textFieldRender
  },
  {
    title: '减免性质',
    dataIndex: 'taxExemptionNature',
    key: 'taxExemptionNature',
    render: textFieldRender
  },
  {
    title: '减免税额',
    dataIndex: 'taxExemption',
    key: 'taxExemption',
    render: textFieldRender
  },
  {
    title: '本期应补（退）税额',
    dataIndex: 'sum',
    key: 'sum',
    render: textFieldRender
  },
];