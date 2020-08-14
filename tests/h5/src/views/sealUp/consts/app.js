export const materials = [{
        id: 2462,
        name: '申请人工作证明',
    },
    {
        id: 2463,
        name: '协助执行通知书',
    },
    {
        id: 2464,
        name: '法律文书'
    }
]

export const testData = {
    "orderId": 546,
    "orderNo": "CF20200120000006",
    "estateInfo": {
        "certificateType": 2,
        "warrantNumber": "2020010611116666",
        "droiterName": "汤琪",
        "propertyStatus": "查封,抵押,挂失,异议",
        "estateLocation": "黑龙江省鹤岗市南山区六号街道",
        "area": "12300",
        "estateUnit": "黑（2019）鹤岗市不动产权第1234567891234567号123",
        "floor": null,
        "buildingYear": "2019",
        "planUse": "10",
        "houseStructure": "钢结构",
        "houseStructureDesc": null
    },
    "sealInfo": {
        "closeDownOrg": "test19",
        "closeDownType": "续封",
        "startTime": "2020-01-20",
        "endTime": "2020-01-31",
        "unlockRegisterTime": null,
        "executionBook": "202001191016协助执行书202001191016",
        "civilAmibitration": "202001191016民事裁定书202001191016",
        "closeDownRange": "全部",
        "remark": null,
        "applyTime": "2020-01-20"
    },
    "materialList": [{
            "id": 2448,
            "materialType": 63,
            "fileList": [{
                "key": "98c9a0f7-62d6-4ff0-bf8b-0b7fca1d7351",
                "ext": "jpg",
                "pageNum": null,
                "originalName": "1.jpg"
            }]
        },
        {
            "id": 2449,
            "materialType": 64,
            "fileList": [{
                "key": "aa577976-5825-4d75-b6d2-26d849059024",
                "ext": "jpg",
                "pageNum": null,
                "originalName": "1.jpg"
            }]
        },
        {
            "id": 2450,
            "materialType": 65,
            "fileList": [{
                "key": "554b7430-2af0-4ddd-9561-0a307651615a",
                "ext": "jpg",
                "pageNum": null,
                "originalName": "1.jpg"
            }]
        }
    ],
    "sealApplicant": {
        "applicantList": [{
            "id": 4562,
            "name": "欣欣",
            "type": 6,
            "orgType": 0,
            "cardType": 12,
            "cardTypeDesc": "工作证",
            "cardNo": "20200120a",
            "mobile": "15011290007",
            "faceIdentity": 0,
            "credooIdentity": 0,
            "ownershipType": 0,
            "rightProportion": 0.0,
            "holdingType": 0,
            "isHolder": 0,
            "isStarter": null,
            "isTaxesPayer": null,
            "smsStatus": null,
            "address": null,
            "postcode": null,
            "proxyList": null,
            "jointDebtorList": null,
            "corporationName": null,
            "corporationCardType": null,
            "corporationCardNo": null,
            "unanimous": null
        }, {
            "id": 4563,
            "name": "龙丹",
            "type": 6,
            "orgType": 0,
            "cardType": 12,
            "cardTypeDesc": "工作证",
            "cardNo": "20200120b",
            "mobile": "15011290006",
            "faceIdentity": 0,
            "credooIdentity": 0,
            "ownershipType": 0,
            "rightProportion": 0.0,
            "holdingType": 0,
            "isHolder": 0,
            "isStarter": null,
            "isTaxesPayer": null,
            "smsStatus": null,
            "address": null,
            "postcode": null,
            "proxyList": null,
            "jointDebtorList": null,
            "corporationName": null,
            "corporationCardType": null,
            "corporationCardNo": null,
            "unanimous": null
        }],
        "familyList": null,
        "ownershipType": null,
        "holdingType": null,
        "isTax": null,
        "displayIndex": null,
        "orgType": null
    },
    "applyCompanyName": "test19",
    "status": 62,
    "createUser": "",
    "followerUser": "查一",
    "registerType": 4050,
    "modifyTime": "2020-01-20 14:32:54",
    "submitTime": "2020-01-20 14:31:43",
    "statusDesc": "已归档",
    "remark": "null",
    "externalSealingInfo": {
        "startTime": "2019-01-06",
        "endTime": "2020-10-23",
        "assistBook": "民事执行书",
        "civilBook": "协助执行书",
        "applyTime": "2019-10-24",
        "applyInfo": [{
            "name": "小三",
            "cardType": 12,
            "cardTypeDesc": "工作证",
            "cardNo": "658416948234512985",
            "mobile": "12345678912"
        }, {
            "name": "小四",
            "cardType": 12,
            "cardTypeDesc": "工作证",
            "cardNo": "784362109854103245",
            "mobile": "13245678936"
        }],
        "sealAgency": "鹤岗不动产中心",
        "agencySocialNum": null,
        "sealType": "查封",
        "sealRange": "全部",
        "remark": "附记",
        "needShowInfo": true,
        "needShowSuffixButton": null,
        "warrantNumber": "2020010611116666",
        "orderNum": null,
        "applicantCertificate": null,
        "assistExecution": null,
        "civilExecution": null,
        "zipAnnex": {
            "fileType": null,
            "materialType": null,
            "fileName": "附件压缩包",
            "fileBase64": null,
            "key": "a63ad761-8417-4131-a7cf-6b58dc0caa64",
            "ext": "zip"
        },
        "estateImmovableUnblockDTO": null
    }
}

// 提交工单的数据结构
export const totalData = {
    "estateInfo": {
        "area": "string",
        "buildingYear": "string",
        "certificateType": 0,
        "droiterName": "string",
        "estateLocation": "string",
        "estateUnit": "string",
        "floor": "string",
        "houseStructure": "string",
        "houseStructureDesc": "string",
        "planUse": "string",
        "propertyStatus": "string",
        "warrantNumber": "string"
    },
    "externalSealingInfo": {
        "agencySocialNum": "string",
        "applicantCertificate": [{
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }],
        "applyInfo": [{
            "cardNo": "string",
            "cardType": 0,
            "cardTypeDesc": "string",
            "mobile": "string",
            "name": "string"
        }],
        "applyTime": "2020-02-13T08:20:00.641Z",
        "assistBook": "string",
        "assistExecution": [{
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }],
        "civilBook": "string",
        "civilExecution": [{
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }],
        "endTime": "2020-02-13T08:20:00.641Z",
        "estateImmovableUnblockDTO": {
            "agencySocialNum": "string",
            "applyInfo": [{
                "cardNo": "string",
                "cardType": 0,
                "cardTypeDesc": "string",
                "mobile": "string",
                "name": "string"
            }],
            "applyTime": "2020-02-13T08:20:00.641Z",
            "assistBook": "string",
            "civilBook": "string",
            "remark": "string",
            "sealAgency": "string",
            "sealType": "string",
            "unblockTime": "2020-02-13T08:20:00.641Z",
            "zipAnnex": {
                "ext": "string",
                "fileBase64": "string",
                "fileName": "string",
                "fileType": "string",
                "key": "string",
                "materialType": "string"
            }
        },
        "needShowInfo": false,
        "needShowSuffixButton": false,
        "orderNum": 0,
        "remark": "string",
        "sealAgency": "string",
        "sealRange": "string",
        "sealType": "string",
        "startTime": "2020-02-13T08:20:00.641Z",
        "warrantNumber": "string",
        "zipAnnex": {
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }
    },
    "materialList": [{
        "fileList": [{
            "ext": "string",
            "key": "string",
            "originalName": "string",
            "pageNum": "string"
        }],
        "id": 0,
        "materialType": 0
    }],
    "orderId": 0,
    "registerType": 0,
    "sealApplicant": {
        "applicantList": [{
            "address": "string",
            "cardNo": "string",
            "cardType": 0,
            "cardTypeDesc": "string",
            "corporationCardNo": "string",
            "corporationCardType": 0,
            "corporationName": "string",
            "credooIdentity": 0,
            "faceIdentity": 0,
            "holdingType": 0,
            "id": 0,
            "isHolder": 0,
            "isStarter": 0,
            "isTaxesPayer": 0,
            "jointDebtorList": [{}],
            "mobile": "string",
            "name": "string",
            "orgType": 0,
            "ownershipType": 0,
            "postcode": "string",
            "proxyList": [{}],
            "proxyType": 0,
            "rightProportion": 0,
            "smsStatus": 0,
            "type": 0,
            "unanimous": 0
        }],
        "displayIndex": 0,
        "familyList": [{
            "familyId": 0,
            "familyMemberList": [{
                "cardNo": "string",
                "cardType": 0,
                "cardTypeDesc": "string",
                "editFlag": 0,
                "familyId": 0,
                "isApplicant": 0,
                "isEnterprise": 0,
                "name": "string"
            }],
            "type": 0
        }],
        "holdingType": 0,
        "isTax": 0,
        "orgType": 0,
        "ownershipType": 0
    },
    "sealInfo": {
        "applyTime": "2020-02-13T08:20:00.641Z",
        "civilAmibitration": "string",
        "closeDownOrg": "string",
        "closeDownRange": "string",
        "closeDownType": "string",
        "endTime": "2020-02-13T08:20:00.642Z",
        "executionBook": "string",
        "remark": "string",
        "startTime": "2020-02-13T08:20:00.642Z",
        "unlockRegisterTime": "2020-02-13T08:20:00.642Z"
    }
}

// 暂存查封工单的数据结构
export const saveTotalData = {
    "estateInfo": {
        "area": "string",
        "buildingYear": "string",
        "certificateType": 0,
        "droiterName": "string",
        "estateLocation": "string",
        "estateUnit": "string",
        "floor": "string",
        "houseStructure": "string",
        "houseStructureDesc": "string",
        "planUse": "string",
        "propertyStatus": "string",
        "warrantNumber": "string"
    },
    "externalSealingInfo": {
        "agencySocialNum": "string",
        "applicantCertificate": [{
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }],
        "applyInfo": [{
            "cardNo": "string",
            "cardType": 0,
            "cardTypeDesc": "string",
            "mobile": "string",
            "name": "string"
        }],
        "applyTime": "2020-02-13T08:20:00.614Z",
        "assistBook": "string",
        "assistExecution": [{
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }],
        "civilBook": "string",
        "civilExecution": [{
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }],
        "endTime": "2020-02-13T08:20:00.614Z",
        "estateImmovableUnblockDTO": {
            "agencySocialNum": "string",
            "applyInfo": [{
                "cardNo": "string",
                "cardType": 0,
                "cardTypeDesc": "string",
                "mobile": "string",
                "name": "string"
            }],
            "applyTime": "2020-02-13T08:20:00.614Z",
            "assistBook": "string",
            "civilBook": "string",
            "remark": "string",
            "sealAgency": "string",
            "sealType": "string",
            "unblockTime": "2020-02-13T08:20:00.614Z",
            "zipAnnex": {
                "ext": "string",
                "fileBase64": "string",
                "fileName": "string",
                "fileType": "string",
                "key": "string",
                "materialType": "string"
            }
        },
        "needShowInfo": false,
        "needShowSuffixButton": false,
        "orderNum": 0,
        "remark": "string",
        "sealAgency": "string",
        "sealRange": "string",
        "sealType": "string",
        "startTime": "2020-02-13T08:20:00.614Z",
        "warrantNumber": "string",
        "zipAnnex": {
            "ext": "string",
            "fileBase64": "string",
            "fileName": "string",
            "fileType": "string",
            "key": "string",
            "materialType": "string"
        }
    },
    "materialList": [{
        "fileList": [{
            "ext": "string",
            "key": "string",
            "originalName": "string",
            "pageNum": "string"
        }],
        "id": 0,
        "materialType": 0
    }],
    "orderId": 0,
    "registerType": 0,
    "sealApplicant": {
        "applicantList": [{
            "address": "string",
            "cardNo": "string",
            "cardType": 0,
            "cardTypeDesc": "string",
            "corporationCardNo": "string",
            "corporationCardType": 0,
            "corporationName": "string",
            "credooIdentity": 0,
            "faceIdentity": 0,
            "holdingType": 0,
            "id": 0,
            "isHolder": 0,
            "isStarter": 0,
            "isTaxesPayer": 0,
            "jointDebtorList": [{}],
            "mobile": "string",
            "name": "string",
            "orgType": 0,
            "ownershipType": 0,
            "postcode": "string",
            "proxyList": [{}],
            "proxyType": 0,
            "rightProportion": 0,
            "smsStatus": 0,
            "type": 0,
            "unanimous": 0
        }],
        "displayIndex": 0,
        "familyList": [{
            "familyId": 0,
            "familyMemberList": [{
                "cardNo": "string",
                "cardType": 0,
                "cardTypeDesc": "string",
                "editFlag": 0,
                "familyId": 0,
                "isApplicant": 0,
                "isEnterprise": 0,
                "name": "string"
            }],
            "type": 0
        }],
        "holdingType": 0,
        "isTax": 0,
        "orgType": 0,
        "ownershipType": 0
    },
    "sealInfo": {
        "applyTime": "2020-02-13T08:20:00.615Z",
        "civilAmibitration": "string",
        "closeDownOrg": "string",
        "closeDownRange": "string",
        "closeDownType": "string",
        "endTime": "2020-02-13T08:20:00.615Z",
        "executionBook": "string",
        "remark": "string",
        "startTime": "2020-02-13T08:20:00.615Z",
        "unlockRegisterTime": "2020-02-13T08:20:00.615Z"
    }
}

//   不动产查询数据
export const searchData = {
    "houseStatus": "查封,抵押,挂失,异议",
    "rightName": "汤琪",
    "registering": null,
    "registerStatus": "15",
    "estateSealDTO": {
        "certificateType": 2,
        "warrantNumber": "2020010611116666",
        "droiterName": "汤琪",
        "propertyStatus": "查封,抵押,挂失,异议",
        "estateLocation": "黑龙江省鹤岗市南山区六号街道",
        "area": "123",
        "estateUnit": "黑（2019）鹤岗市不动产权第1234567891234567号123",
        "floor": "8/20",
        "buildingYear": "2019",
        "planUse": "10",
        "houseStructure": "1",
        "houseStructureDesc": "钢结构"
    },
    "estateImmovableSealDTOList": [{
            "startTime": "2019-01-06",
            "endTime": "2020-10-23",
            "assistBook": "民事执行书",
            "civilBook": "协助执行书",
            "applyTime": "2019-10-24",
            "applyInfo": [{
                    "name": "小葛",
                    "cardType": null,
                    "cardTypeDesc": "工作证",
                    "cardNo": "658416948234512985",
                    "mobile": "12345678912"
                },
                {
                    "name": "小郭",
                    "cardType": null,
                    "cardTypeDesc": "工作证",
                    "cardNo": "784362109854103245",
                    "mobile": "13245678936"
                }
            ],
            "sealAgency": "鹤岗不动产中心",
            "agencySocialNum": "123456789123456799",
            "sealType": "查封",
            "sealRange": "全部",
            "remark": "附记",
            "needShowInfo": true,
            "needShowSuffixButton": true,
            "warrantNumber": "2020010611116666",
            "orderNum": null,
            "applicantCertificate": [],
            "assistExecution": [],
            "civilExecution": [],
            "zipAnnex": {
                "fileType": null,
                "materialType": null,
                "fileName": "附件压缩包",
                "fileBase64": null,
                "key": "a1f90208-8b0c-4967-938b-b039c508dcf1",
                "ext": "zip"
            },
            "estateImmovableUnblockDTO": null
        },
        {
            "startTime": "2019-01-06",
            "endTime": "2020-10-23",
            "assistBook": "民事执行书",
            "civilBook": "协助执行书",
            "applyTime": "2019-10-24",
            "applyInfo": [{
                    "name": "小三",
                    "cardType": null,
                    "cardTypeDesc": "工作证",
                    "cardNo": "658416948234512985",
                    "mobile": "12345678912"
                },
                {
                    "name": "小四",
                    "cardType": null,
                    "cardTypeDesc": "工作证",
                    "cardNo": "784362109854103245",
                    "mobile": "13245678936"
                }
            ],
            "sealAgency": "鹤岗不动产中心",
            "agencySocialNum": "123456789123456799",
            "sealType": "查封",
            "sealRange": "全部",
            "remark": "附记",
            "needShowInfo": true,
            "needShowSuffixButton": true,
            "warrantNumber": "2020010611116666",
            "orderNum": null,
            "applicantCertificate": [],
            "assistExecution": [],
            "civilExecution": [],
            "zipAnnex": {
                "fileType": null,
                "materialType": null,
                "fileName": "附件压缩包",
                "fileBase64": null,
                "key": "5b26b41a-3535-467c-9151-5c412619736c",
                "ext": "zip"
            },
            "estateImmovableUnblockDTO": null
        }
    ],
    "showReminder": false
}