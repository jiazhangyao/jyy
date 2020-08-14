// DAO层 開始 根據swagger定義對象結構，防止數據缺失
// 获取对象实例 ApplicantInfoDTO 
export function newApplicantInfoDTO(values={}) {
    return new Object({
        applicantList: [], // 申请人信息列表 ,
        familyList: [{}], // 申请人家庭信息列表 （只有义务人权利人需要） ,
        holdingType: undefined, // 持证方式-1共同持证 2分别持证 (只有权利人需要填） ,
        isTax: undefined, // 是否纳税主体：1 是 ，0 否 ,
        ownershipType: undefined, // 共有方式-1单独所有 2共同共有 3按份额共有 4其它共有 (只有权利人需要填）
        ...values
    });
}
export function newFamilyDTO(values={}) {
    return new Object({
        familyId: undefined, // 家庭ID ,
        familyMemberList: [], // 家庭成员信息列表 ,
        type: undefined, // 家庭类型
        ...values
    })
}
export function newApplicantDTO(values={}) {
    return new Object({
        address: undefined, // 通讯地址 ,
        cardNo: '', // 证件号码 ,
        cardType: undefined, // 证件类型 ,
        cardTypeDesc: undefined, // 证件类型 ,
        corporationCardNo: undefined, // 法人/负责人证件号码 ,
        corporationCardType: undefined, // 法人/负责人证件类型 ,
        corporationName: undefined, // 法人/负责人名称 ,
        credooIdentity: 0, // 实人认证状态-0未认证 1认证成功 2认证失败 ,
        faceIdentity: 1, // 人脸识别状态-0未认证 1认证成功 2认证失败 ,
        holdingType: undefined, // 持证方式-1共同持证 2分别持证 ,
        id: undefined, // 申请人id ,
        isHolder: 1, // 是否持证人-0否 1是 ,
        isStarter: 0, // 是否发起人-0否 1是 ,
        isTaxesPayer: undefined, // 是否纳税人-0否 1是 ,
        jointDebtorList: [], // 共同债务人列表，为空时说明无共同债务人,
        mobile: '', // 手机号 ,
        name: '', // 申请人姓名 ,
        orgType: undefined, // 申请人所属组织单位类型-1个人 2企业 3事业单位 4国家机关 0其他 ,
        ownershipType: undefined, // 共有方式-1单独所有 2共同共有 3按份额共有 4其它共有 ,
        postcode: undefined, // 邮编 ,
        proxyList: [], // 代理人列表，为空时说明无代理人,
        rightProportion: undefined, // 权利比例- 百分比,
        smsStatus: undefined, // 1 已验证 0 未验证 ,
        type: undefined, // 申请人类型-1义务人 2权利人 3代理人 4抵押人 5抵押权人 6查封申请人 7债务人 8共同债务人 9法定代表人 10法定代表人-代理人 11义务共有人 12权利共有人 ,
        unanimous: undefined, // 与核心的身份证号是否一致（0：不一致 1：一致）
        isApplicant: 0,
        ...values
    })
}
export function newOrderAskInfoDTO(values={}) {
    return new Object({
        buyerSaler: undefined, // int
        haveJoinOwner: undefined, // int 申请登记的房屋有无共有人:0、无 1、有 ,
        id: undefined, // int id ,
        isLaw: undefined, // int 是否保证所提交的申请登记材料、申请信息真实、合法、有效，如有不实，愿承担一切法律责任，与登记机构无关:0否 1是 ,
        isReal: undefined, // int 申请事项是否为申请人真实意思：0否、1是 ,
        orderId: undefined, // int 关联订单id
        ...values
    })
}
export function newMaterialInfoDTO(values={}) {
    return new Object({
        fileList: [], // 材料文件列表 ,
        id: undefined, // 材料主键id ,
        materialType: undefined, // 材料类型
        ...values
    })
}
export function newFileDTO(values={}) {
    return new Object({
        ext: undefined, // 文件后缀名,jpg,png,gif等 ,
        key: undefined, // 文件的唯一标识 ,
        originalName: undefined, // 原始名称 ,
        pageNum: undefined, // 页号
        ...values
    })
}
export function newOrderHouseDTO(values={}) {
    return new Object({
        bdcdyh: undefined, // 不动产单元号 ,
        bdcqzh: undefined, // 不动产权证号 ,
        commonInfo: undefined, // 共有信息 ,
        dj: undefined, // 等级 ,
        dlrdh: undefined, // 代理人电话 ,
        dlrxm: undefined, // 代理人姓名 ,
        dlrzjbh: undefined, // 代理人证件编号 ,
        dlrzjlx: undefined, // 代理人证件类型01 身份证，02 工作证，03 组织机构代码 ,
        dymj: undefined, // 独用面积（单位：平米） ,
        fddbrhfzrxm: undefined, // 法定代表人或负责人姓名 ,
        ftmj: undefined, // 分摊面积（单位：平米） ,
        ftxs: undefined, // 分摊系数 ,
        fzmj: undefined, // 发证面积（单位：平米） ,
        gyqlrqk: undefined, // 共有/共有权利人情况 ,
        id: undefined, // id ,
        jd: undefined, // 街道（乡镇） ,
        jf: undefined, // 街坊（村） ,
        jg: undefined, // 价格（单位：元，两位小数 ,
        jzzdmj: undefined, // 建筑占地面积（单位：平米 ,
        mjdw: undefined, // 面积单位 ,
        orderId: undefined, // orderId ,
        ownershipType: undefined, // 共有方式-1单独所有 2共同共有 3按份额共有 4其它共有 ,
        propertyCategory: undefined, // 产权类别 ,
        propertySource: undefined, // 产权来源 ,
        pzmj: undefined, // 批准面积（单位：平米） ,
        pzyt: undefined, // 批准用途 ,
        qllx: undefined, // 权利类型 ,
        qlrxxList: [], // 权利人信息集合 ,
        qlsdfs: undefined, // 权利设定方式 ,
        qlxz: undefined, // 权利性质 ,
        qlxzDesc: undefined, // 土地权利性质（文字） ,
        rightHolder: undefined, // 权利人 ,
        sfcf: undefined, // 是否查封(0:否;1:是) ,
        sfdy: undefined, // 是否抵押(0:否;1:是) ,
        sffbcz: undefined, // 是否分别持证(0:否;1:是) ,
        sfgs: undefined, // 是否挂失(0:否;1:是) ,
        sfyy: undefined, // 是否异议(0:否;1:是) ,
        shiyongq: undefined, // 使用权 ,
        ssbdcqzh: undefined, // 上手产权代码 ,
        suoyouq: undefined, // 所有权 ,
        syqmj: undefined, // 使用权面积（单位：平米） ,
        syqxq: undefined, // 使用期限起（格式：yyyy-MM-dd） ,
        syqxz: undefined, // 使用期限止（格式：yyyy-MM-dd） ,
        szblc: undefined, // 所在图幅号（比例尺） ,
        sztfh: undefined, // 所在图幅号（图幅号） ,
        szz: undefined, // 所在组 ,
        tdqslyzmcl: undefined, // 土地权属来源证明材料 ,
        tdyt: undefined, // 土地用途 ,
        tdytDesc: undefined, // 土地用途（文字） ,
        tdytMap: [], // 土地用途key-value映射 ,
        tdzl: undefined, // 土地坐落 ,
        xzqh: undefined, // 行政区划 ,
        ybzddm: undefined, // 预编宗地代码 ,
        zddm: undefined, // 宗地代码 ,
        zdmj: undefined, // 宗地面积（单位：平米） ,
        zdszb: undefined, // 宗地四至-北 ,
        zdszd: undefined, // 宗地四至-东 ,
        zdszn: undefined, // 宗地四至-南 ,
        zdszx: undefined, // 宗地四至-西 ,
        zjzmj: undefined, // 总建筑面积（单位：平米）
        ...values
    })
}
export function newOrderMailDTO(values={}) {
    return new Object({
        addressInfo: undefined, // 地理信息 ,
        consignee: undefined, // 收件人 ,
        expressCompany: undefined, // 快递公司0-不限 1-EMS 2-顺丰 3-中通 ,
        logisticsState: undefined, // 物流状态0-不限 1-待揽件 2-已揽件 3-邮寄中 4-已签收 ,
        mobile: undefined, // 收件人手机 ,
        orderId: undefined, // 订单ID ,
        trackingNumber: undefined, // 快递单号
        ...values
    })
}
export function newOrderTradeInfoDTO(values={}) {
    return new Object({
        housePrice: undefined, //购房价格 ,
        id: undefined, // 交易信息Id ,
        orderId: undefined, // 关联订单ID ,
        propertyRightSource: 1, // 产权来源：1、买卖 2、其他 ,
        taxesPayer: undefined, // 缴纳税费主体:1、卖方，2、买方，3、申请人 ,
        tradeBuyerId: undefined, // 买方发起人 ,
        tradeSalerId: undefined, // 卖方发起人
        ...values
    })
}
export function newSyqrxxDTO(values={}) {
    return new Object({
        bdcqzh: undefined, // 不动产权证号 ,
        qlrlx: undefined, // 权利人类型 ,
        sfhmd: undefined, // 是否黑名单(0:否，1:是) ,
        syqrxm: undefined, // 所有权人姓名 ,
        zjhm: undefined, // 证件号码 ,
        zjlx: undefined, // 证件类型 ,
        zyfe: undefined, // 占有份额
        ...values
    })
}
export function newQlrxxDTO(values={}) {
    return new Object({
        bdcqzh: undefined, // 不动产权证号 ,
        qlrlx: undefined, // 权利人类型 ,
        qlrxm: undefined, // 权利人姓名 ,
        sfhmd: undefined, // 是否黑名单(0:否;1:是) ,
        zjhm: undefined, // 权利人证件号码 ,
        zjlx: undefined, // 权利人证件类型01 身份证，02 工作证，03 组织机构代码
        ...values
    })
}
export function newFamilyMemberDTO(values={}) {
    return new Object({
        cardNo: '', // 证件号码 ,
        cardType: 1, // 证件类型 1身份证号 ,
        cardTypeDesc: '身份证', // 证件类型中文描述 ,
        editFlag: 1, // 1-C端新增 2-G端新增 ,
        familyId: undefined, // 家庭ID ,
        isApplicant: 0, // 是否申请人-0否 ,1是 ,
        name: '', // 成员姓名
        ...values
    })
}
// DAO层 结束