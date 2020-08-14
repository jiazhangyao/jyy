import Enum from '@/utils/Enum';

/**
 * @description: 工单状态
 * 转移登记  5030 || 5010 || 5020 (registerType)
 * 转移登记可编辑：20 status && editable
 * 转移登记不可编辑：56 status  前往确认
 * 转移登记不可编辑：52 status 前往签署
 * 转移登记不可编辑：53 status 前往支付
 * certificateNumber 查看电子证照
 */